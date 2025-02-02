import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./axios/axiosConfig";
import { baseURL } from "../constants/authentications";

export const getUser = async () => {
  const token = await AsyncStorage.getItem("AuthToken");
  const currentUserEmail = await AsyncStorage.getItem("currentUserEmail");

  console.log("CURRENT USER EMAIL:", currentUserEmail);
  console.log("TOKEN DO USER:", token);

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };

  if (currentUserEmail) {
    try {
      const response = await fetch(`${baseURL}/users?search=${currentUserEmail}`, {
        headers
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const data = await response.json();
      console.log("USUARIOS RETORNADOS:", data);
      await AsyncStorage.setItem("currentUser", JSON.stringify(data));
      return data;

    } catch (error) {
      console.error("Erro ao buscar usuario:", error);
      throw error;
    }
  } else {
    console.error("Erro ao buscar email do usuario do AsyncStorage: currentUserEmail não encontrado");
  }
};

export const getUserById = async (userId: string) => {
  const token = await AsyncStorage.getItem("AuthToken");

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };

  if (userId) {
    try {
      const response = await api.get(`/users/${userId}`, {
        headers
      });

      if (!response) {
        throw new Error(`Erro: sem resposta`);
      }

      return response.data;

    } catch (error) {
      console.error("Erro ao buscar usuario:", error);
      throw error;
    }
  } else {
    console.error("Erro ao buscar email do usuario do AsyncStorage: currentUserEmail não encontrado");
  }
}

