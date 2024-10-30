import { api } from "./axios/axiosConfig";
import { IPostUser } from "../@types/TUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createUser = async (data: IPostUser) => {
  try {
    console.log("Criando usuário com os dados:", data);
    const response = await api.post('/users', data);
    AsyncStorage.setItem("currentUser", response.data.id);

  } catch (error: any) {
    console.error("Erro ao criar usuário:", error.response?.data || error.message);
    throw error;
  }
}
