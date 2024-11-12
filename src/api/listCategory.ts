import { ICategories } from "../@types/TCategories";
import { api } from "./axios/axiosConfig"
import AsyncStorage from "@react-native-async-storage/async-storage";
export const ListCategories = async () => {

  const token = await AsyncStorage.getItem("AuthToken");

  const headers = {
    'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
  }
  try {
    const response = await api.get(`/categories`, { headers })
    return response.data.items;
  } catch (error: any) {
    return error.message
  }
}