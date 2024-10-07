import { Temail } from "../@types/TEmail";
import { api } from "./axios/axiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const postEmail = async (data: Temail) => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const response = await api.post(`/security/auth/generate`, data, { headers });
    console.log("Response:", typeof (response));
    console.log("ResponseObj", response)
    console.log("Token:", typeof (response.data.token));

    await AsyncStorage.setItem("authCodeByEmail", response.data.token);
  } catch (error) {
    console.error('Erro ao enviar o email:', error);
  }
}
