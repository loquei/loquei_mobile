import AsyncStorage from "@react-native-async-storage/async-storage";
import { IPostRating } from "../@types/TRating";
import { api } from "./axios/axiosConfig";

export const postRating = async (data: IPostRating) => {
  const token = await AsyncStorage.getItem("AuthToken");

  if (!token) {
    console.error("Token de autenticação não encontrado.");
    return;
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  try {
    const response = await api.post("/ratings", data, { headers });
    console.log("Avaliação enviada com sucesso:", response.data);
  } catch (error: any) {
    if (error.response) {
      console.error("Erro ao enviar avaliação:", {
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error("Erro na requisição:", error.request);
    } else {
      console.error("Erro inesperado:", error.message);
    }
  }
};
