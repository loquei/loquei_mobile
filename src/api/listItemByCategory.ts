import { api } from "./axios/axiosConfig"
import AsyncStorage from "@react-native-async-storage/async-storage";
export const listItemByCategory = async (categoryId: string) => {
  const token = await AsyncStorage.getItem("AuthToken");
  const headers = {
    'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
  }
  try {
    const response = await api.get(`/items/category/${categoryId}`, { headers })
    return response.data.items;
  } catch (error: any) {
    return error.message
  }
}