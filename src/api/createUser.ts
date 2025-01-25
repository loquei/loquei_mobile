import { api } from "./axios/axiosConfig";
import { IPostUser } from "../@types/TUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createUser = async (data: IPostUser) => {
  try {
    console.log("Criando usuário com os dados:", data);
    const response = await api.post('/users', data);

    await AsyncStorage.setItem("currentUser", response.data.id.toString());

    return { success: true, data: response.data };
  } catch (error: any) {
    console.log("Erro ao criar usuário:", error.response?.data);

    if (error.response?.data?.errors) {
      return { success: false, errors: error.response.data.errors };
    } else {
      return { success: false, message: "Erro desconhecido. Tente novamente." };
    }
  }
};
