import { api } from "./axios/axiosConfig"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const listWishlistItems = async (userId: string) => {

  const token = await AsyncStorage.getItem("AuthToken");

  const headers = {
    'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
  }

  console.log("Wishlist userId", userId)

  try {
    const response = await api.get(`/items/wishlist/${userId}`, { headers })
    return response.data.items;
  } catch (error: any) {
    return error.message
  }
}