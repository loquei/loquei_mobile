import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./axios/axiosConfig";

export const getUserPhoto = async (userId: string) => {
  const token = await AsyncStorage.getItem("AuthToken");
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  try {
    const response = await api.get(`/users/images/view/${userId}`, { headers });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.log("Imagem não encontrada para o usuário.");
      return null;
    }
    console.error('Erro ao buscar imagem do usuário:', error);
    throw error;
  }
};
