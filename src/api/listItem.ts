import { api } from "./axios/axiosConfig";

export const ListItems = async () => {
  const headers = { 'Content-Type': 'application/json' }
  try {
    const response = await api.get('/items', { headers });
    return response;
  } catch {
    console.log('deu errado')
  }
}