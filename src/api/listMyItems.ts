import { IGetItemResponse } from "../@types/TItem";
import { api } from "./axios/axiosConfig";

const userEmail = "paulocdrao.123@gmail.com"

export const ListMyItems = async () => {
  const headers = { 'Content-Type': 'application/json' }
  try {
    const response = await api.get<IGetItemResponse>(`/items?email=${userEmail}`, { headers });
    return response.data.items;
  } catch (error) {
    throw error;
  }
}
