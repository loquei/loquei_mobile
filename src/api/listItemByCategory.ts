import { api } from "./axios/axiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetItemImages } from "./getItemImages"; // Função auxiliar para buscar imagens de um item
import { IGetItem } from "../@types/TItem"; // Tipo de dados do item

export const listItemByCategory = async (categoryId: string) => {
  const token = await AsyncStorage.getItem("AuthToken");
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  try {
    // Log antes da requisição dos itens da categoria
    console.log(`Buscando itens da categoria: ${categoryId}...`);

    const responseItems = await api.get(`/items/category/${categoryId}`, { headers });
    console.log("Itens da categoria recebidos com sucesso:", responseItems.data.items);

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

    console.log("Itens da categoria com imagens combinadas:", responseItemsWithImages);
    return responseItemsWithImages;

  } catch (error) {
    console.error('Erro ao buscar itens da categoria:', error);
    throw error;
  }
};
