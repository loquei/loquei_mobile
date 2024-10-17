import { IGetItemResponse } from "../@types/TItem";
import { api } from "./axios/axiosConfig";

const userEmail = ""

export const ListMyItems = async () => {
  const headers = { 'Content-Type': 'application/json' }
  try {
    const response = await api.get<IGetItemResponse>(`/items/${userEmail}`, { headers });
    return response.data.items;
  } catch (error) {

    console.error('Erro ao buscar itens:', error);
    throw error;
  }
}
