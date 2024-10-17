import { IGetItemResponse } from "../@types/TItem";
import { api } from "./axios/axiosConfig";

export const DeleteItems = async (id: string) => {
  const headers = { 'Content-Type': 'application/json' }
  try {
    await api.delete(`/items/${id}`, { headers });
  } catch (error) {
    console.error('Erro ao deletar itens:', error);
    throw error;
  }
}
