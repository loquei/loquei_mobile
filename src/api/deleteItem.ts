import { api } from "./axios/axiosConfig";

export const DeleteItems = async (id: string) => {
  const headers = { 'Content-Type': 'application/json' }
  try {
    await api.delete(`/items/${id}`, { headers });
  } catch (error) {
    throw error;
  }
}
