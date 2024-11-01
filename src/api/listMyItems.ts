import AsyncStorage from "@react-native-async-storage/async-storage";
import { IGetItemResponse } from "../@types/TItem";
import { api } from "./axios/axiosConfig";
import { GetItemImages } from "./getItemImages";

export const ListMyItems = async () => {
  const token = await AsyncStorage.getItem("AuthToken");

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };

  try {
    const currentUser = await AsyncStorage.getItem("currentUser");
    if (currentUser) {
      console.log("currentUser", currentUser);
      const parsedUser = JSON.parse(currentUser);

      const userEmail = parsedUser.items[0]?.email;
      if (!userEmail) {
        throw new Error("Email do usuário não encontrado.");
      }

      const response = await api.get<IGetItemResponse>(`/items?ownerEmail=${userEmail}`, { headers });
      console.log("Lista de itens do usuário recebida com sucesso:", response.data.items);

      // Mapeia os itens para adicionar as imagens correspondentes
      const responseItemsWithImages = await Promise.all(
        response.data.items.map(async (item) => {
          try {
            console.log(`Buscando imagens para o item com ID: ${item.id}`);

            const responseImages = await GetItemImages(item.id);
            console.log(`Imagens encontradas para o item ${item.id}:`, responseImages);

            return { ...item, images: responseImages };
          } catch (error) {
            console.error(`Erro ao buscar imagens para o item com ID: ${item.id}`, error);
            return { ...item, images: [] };
          }
        })
      );

      console.log("Lista de itens do usuário com imagens combinadas:", responseItemsWithImages);
      return responseItemsWithImages;

    } else {
      console.warn("Nenhum usuário atual encontrado no AsyncStorage.");
      return [];
    }
  } catch (error) {
    console.error("Erro ao listar itens do usuário:", error);
    throw error;
  }
};
