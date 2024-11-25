import { api } from "./axios/axiosConfig";
import { IPostImage } from "../@types/TItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from 'expo-image-manipulator';

export const postItemImage = async (data: IPostImage) => {
  try {
    const token = await AsyncStorage.getItem("AuthToken");

    if (!token) {
      console.error("Erro: Token de autenticação não encontrado.");
      return "Token de autenticação não encontrado.";
    }

    console.log("Token de autenticação encontrado:", token);

    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    };

    const itemData = await AsyncStorage.getItem('createdProduct');

    if (!itemData) {
      console.error("Erro: Dados do produto não encontrados no AsyncStorage.");
      return "Dados do produto não encontrados.";
    }

    const item = JSON.parse(itemData);
    const id = item?.id;

    if (!id) {
      console.error("Erro: ID do produto não encontrado.");
      return "ID do produto não encontrado.";
    }

    // Isso envia as imagens para o servidor uma por uma
    for (let i = 0; i < data.imagePaths.length; i++) {
      try {
        const fileUri = data.imagePaths[i];

        // Verifica se o arquivo existe  
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        if (!fileInfo.exists) {
          console.error(`Erro: Arquivo de imagem ${fileUri} não encontrado.`);
          return `Arquivo de imagem ${fileUri} não encontrado.`;
        }

        const fileName = fileUri.split('/').pop();
        const fileType = fileUri.substring(fileUri.lastIndexOf(".") + 1); // Tipo do arquivo (jpg, png, etc.)  

        const compressImage = async (uri: string) => {
          const compressedImage = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 1000 } }],
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Compacta a imagem para 70%
          );
          return compressedImage.uri;
        };

        const compressedUri = await compressImage(fileUri);

        const formData = new FormData();
        formData.append("file", {
          uri: compressedUri,
          name: fileName,
          type: `image/${fileType}`,
        });

        console.log(`Enviando imagem ${i + 1} de ${data.imagePaths.length} para o produto com ID: ${id}`);

        const response = await api.post(`/items/images/${id}`, formData, { headers });

        if (response.status !== 201) {
          console.error(`Erro ao enviar a imagem ${i + 1}: Status ${response.status}`);
          return `Erro ao enviar a imagem ${i + 1}. Status: ${response.status}`;
        }

        console.log(`Imagem ${i + 1} enviada com sucesso.`);
      } catch (imgError: any) {
        console.error(`Erro ao processar a imagem ${i + 1}:`, imgError?.message || imgError);
        return `Erro ao processar a imagem ${i + 1}: ${imgError?.message || 'Erro desconhecido'}`;
      }
    }

    await AsyncStorage.removeItem('createdProduct');
    console.log("Dados do produto removidos do AsyncStorage.");

  } catch (error: any) {
    console.error("Erro ao enviar imagens do produto:", error?.message || error);
    return error?.message || "Erro desconhecido.";
  }
};

export const postUserImage = async (userId: string, image: { imagePaths: string[] }) => {
  const token = await AsyncStorage.getItem("AuthToken");

  if (!token) {
    console.error("Erro: Token de autenticação não encontrado.");
    throw new Error("Token de autenticação não encontrado.");
  }

  console.log("Token de autenticação encontrado:", token);

  const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`,
  };

  try {
    for (let i = 0; i < image.imagePaths.length; i++) {
      const imagePath = image.imagePaths[i];
      const fileName = imagePath.split('/').pop();

      if (!fileName) {
        console.error(`Erro: Nome do arquivo ${i + 1} não encontrado.`);
        throw new Error(`Nome do arquivo ${i + 1} não encontrado.`);
      }

      const fileType = fileName.split('.').pop();

      const compressedUri = await ImageManipulator.manipulateAsync(
        imagePath,
        [{ resize: { width: 800 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Compacta a imagem
      ).then(res => res.uri);

      const formData = new FormData();
      formData.append("file", {
        uri: compressedUri,
        name: fileName,
        type: `image/${fileType}`,
      });

      console.log(`Enviando imagem ${i + 1} de ${image.imagePaths.length} para o usuário com ID: ${userId}`);

      try {
        const response = await api.post(`/users/images/${userId}`, formData, { headers });

        if (response.status === 201 || response.status === 200) {
          console.log(`Imagem ${i + 1} enviada com sucesso.`);
        } else {
          console.error(`Erro ao enviar a imagem ${i + 1}: Status ${response.status}`);
          throw new Error(`Erro ao enviar a imagem ${i + 1}. Status: ${response.status}`);
        }
      } catch (imgError: any) {
        if (imgError.response?.status === 422) {
          console.error("Erro 422: A nova foto precisa ser diferente da atual.");
          throw new Error("A nova foto precisa ser diferente da atual.");
        } else {
          console.error(`Erro ao processar a imagem ${i + 1}:`, imgError?.message || imgError);
          throw new Error(`Erro ao processar a imagem ${i + 1}: ${imgError?.message || 'Erro desconhecido'}`);
        }
      }
    }

    await AsyncStorage.removeItem('createdProduct');
    console.log("Dados do produto removidos do AsyncStorage.");
  } catch (error: any) {
    console.error("Erro ao enviar imagens do produto:", error?.message || error);
    throw new Error(error?.message || "Erro desconhecido.");
  }
};