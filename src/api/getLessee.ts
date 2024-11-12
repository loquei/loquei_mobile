import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../constants/authentications";

export const getLessee = async (lesseeId: string) => {
  const token = await AsyncStorage.getItem("AuthToken");

  console.log("TOKEN DO USER:", token);

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };

  try {
    const response = await fetch(`${baseURL}/users/${lesseeId}`, {
      headers
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const data = await response.json();
    console.log("USUARIO RETORNADO:", data);
    return data;

  } catch (error) {
    console.error("Erro ao buscar usuario:", error);
    throw error;
  }
};
