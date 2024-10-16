import { IGetItemResponse } from "../@types/TItem";
import { api } from "./axios/axiosConfig";

export const ListItems = async () => {
  const headers = { 'Content-Type': 'application/json' }
  try {
    const response = await api.get<IGetItemResponse>('/items', { headers });
    return response.data.items;
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
    throw error;
  }
}
