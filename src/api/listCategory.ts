import { api } from "./axios/axiosConfig"

export const ListCategories = async () => {
  const headers = { 'Content-Type': 'application/json' }
  try {
    const response = await api.get(`/categories/`, { headers })
    return response.data;
  } catch (error: any) {
    return error.message
  }
}