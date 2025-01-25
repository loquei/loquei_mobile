import { IGetItem } from "../@types/TItem";
import { api } from "./axios/axiosConfig";
import { GetItemImages } from "./getItemImages";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SearchItems = async (searchTerm: string) => {
  const token = await AsyncStorage.getItem("AuthToken");
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
  try {
    // Log antes da requisição dos itens
    console.log("Iniciando busca pelos itens...");

    const responseItems = await api.get(`/items?search=${searchTerm}`, { headers });
    console.log("Lista de itens recebida com sucesso:", responseItems.data.items);

    // Mapeia os itens para buscar suas imagens
    const responseItemsWithImages = await Promise.all(
      responseItems.data.items.map(async (item: IGetItem) => {
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

    console.log("Lista de itens com imagens combinadas:", responseItemsWithImages);
    return responseItemsWithImages;

  } catch (error) {
    console.error('Erro ao buscar itens:', error);
    throw error;
  }
}