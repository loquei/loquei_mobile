import { IGetItem } from "../@types/TItem";
import { api } from "./axios/axiosConfig";
import { GetItemImages } from "./getItemImages";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ListRecentlyViewedItems = async () => {
  const token = await AsyncStorage.getItem("AuthToken");
  const tempAuth = await AsyncStorage.getItem("tempAuth");

  const parsedAuth = tempAuth ? JSON.parse(tempAuth) : null;

  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
  try {
    // Log antes da requisição dos itens
    console.log("Iniciando busca pelos itens recentes...");

    const responseItems = await api.get(`/items?recentlyViewed=true&userEmail=${parsedAuth.email}`, { headers });
    console.log("Lista de itens recentes recebida com sucesso:", responseItems.data.items);

    // Mapeia os itens para buscar suas imagens
    const responseItemsWithImages = await Promise.all(
      responseItems.data.items.map(async (item: IGetItem) => {
        try {
          console.log(`Buscando imagens para o item recente com ID: ${item.id}`);

          const responseImages = await GetItemImages(item.id);

          console.log(`Imagens encontradas para recente o item ${item.id}:`, responseImages);

          return { ...item, images: responseImages };
        } catch (error) {
          console.error(`Erro ao buscar imagens para o item recente com ID: ${item.id}`, error);
          return { ...item, images: [] };
        }
      })
    );

    console.log("Lista de itens recente com imagens combinadas:", responseItemsWithImages);
    return responseItemsWithImages;

  } catch (error) {
    console.error('Erro ao buscar itens recente:', error);
    throw error;
  }
}