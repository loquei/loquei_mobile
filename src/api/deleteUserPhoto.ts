import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./axios/axiosConfig";

export const deleteUserPhoto = async (userId: string) => {
  const token = await AsyncStorage.getItem("AuthToken");
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  try {
    const response = await api.delete(`/users/images/${userId}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar imagem do usuario:', error);
    throw error;
  }
}