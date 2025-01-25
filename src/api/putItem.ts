import { api } from "./axios/axiosConfig";
import { IPostItem } from "../@types/TItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const putItem = async (id: string, data: IPostItem) => {
  const token = await AsyncStorage.getItem("AuthToken");
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  try {
    console.log("Atualizando dados do item:", JSON.stringify(data));
    const response = await api.put(`/items/${id}`, data, { headers });
    console.log("Requisição de atualização bem-sucedida:", response.data);

    await AsyncStorage.setItem("updatedProduct", JSON.stringify(response.data));
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Erro na requisição PUT:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });

      if (error.response.data.errors) {
        console.error("Detalhes dos erros:", JSON.stringify(error.response.data.errors));
      }
    } else {
      console.error("Erro desconhecido:", error);
    }
    return error;
  }
};