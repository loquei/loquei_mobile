import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./axios/axiosConfig";

export const GetItemImages = async (itemId: string) => {
  const token = await AsyncStorage.getItem("AuthToken");
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
  try {
    console.log(`Iniciando busca de imagens para o item ${itemId}...`);

    const response = await api.get(`/items/images/links/${itemId}`, { headers });

    if (response.data) {
      console.log(`Imagens do item ${itemId} recebidas:`, response.data);
      return response.data;
    } else {
      console.log(`Nenhuma imagem encontrada para o item ${itemId}`);
      return [];
    }

  } catch (error) {
    console.error(`Erro ao buscar imagens do item ${itemId}:`, error);
    throw error;
  }
};