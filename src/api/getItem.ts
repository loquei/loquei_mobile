import { api } from "./axios/axiosConfig";
import { GetItemImages } from "./getItemImages";
import { IGetItem } from "../@types/TItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GetItem = async (itemId: string): Promise<IGetItem> => {
  const token = await AsyncStorage.getItem("AuthToken");
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
  try {
    console.log(`Iniciando busca do item ${itemId}...`);

    const response = await api.get(`/items/${itemId}`, { headers });
    const item = response.data as IGetItem;

    if (item) {
      console.log(`Dados do item ${itemId} recebidos:`, item);

      const itemImages = await GetItemImages(itemId);
      console.log(`Imagens do item ${itemId} recebidas:`, itemImages);

      return { ...item, images: itemImages };
    } else {
      console.log(`Nenhum item encontrado com o id ${itemId}`);
      // isso retorna um objeto vazio caso não encontre o item
      return {} as IGetItem;
    }

  } catch (error) {
    console.error(`Erro ao buscar item ${itemId}:`, error);
    throw error;
  }
};
