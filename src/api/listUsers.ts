import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../constants/authentications";

export const ListUsers = async () => {
  const token = await AsyncStorage.getItem("AuthToken");
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  try {
    const response = await axios.get(`${baseURL}/users`, { headers });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar users:', error);
    throw error;
  }
}