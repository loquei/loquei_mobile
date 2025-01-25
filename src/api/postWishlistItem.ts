import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { api } from "./axios/axiosConfig";

export const postWishlistItem = async (userId: string, itemId: string) => {
  const token = await AsyncStorage.getItem("AuthToken");

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  const data = { user_id: userId, item_id: itemId };

  try {
    await api.post('/wishlist', data, { headers });
  } catch (error: any) {
    if (error instanceof AxiosError) {
      console.error("Erro ao adicionar item à wishlist:", {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      });
    } else {
      console.error("Erro inesperado ao adicionar item à wishlist:", error);
    }
    return error.message;
  }
};
