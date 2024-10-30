import { api } from "./axios/axiosConfig";
import { IPostImage } from "../@types/TItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

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

        const fileName = fileUri.split('/').pop(); // Nome do arquivo da imagem  
        const fileType = fileUri.substring(fileUri.lastIndexOf(".") + 1); // Tipo do arquivo (jpg, png, etc.)  

        const formData = new FormData();
        formData.append("file", {
          uri: fileUri,
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
