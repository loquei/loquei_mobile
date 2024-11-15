import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./axios/axiosConfig"

export const deleteWishlistItem = async (userId: string, itemId: string) => {
  const token = await AsyncStorage.getItem("AuthToken");
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  const data = {
    user_id: userId,
    item_id: itemId
  }

  try {
    const response = await api.delete(`/wishlist`, { headers, data })
    return response.data;
  } catch (error: any) {
    return error.message
  }
}