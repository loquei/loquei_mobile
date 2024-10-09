import { api } from "./axios/axiosConfig"
import { IPostItem } from "../@types/TItem"
import AsyncStorage from "@react-native-async-storage/async-storage";


export const postItem = async (data: IPostItem) => {
  const token = await AsyncStorage.getItem("AuthToken");
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
  try {
    await api.post('/items', data, { headers });
    console.log("deu certo");
  } catch (error: any) {
    console.error("não deu certo", error);
    return error;
  }
}