import { api } from "./axios/axiosConfig"
import { IPostImage } from "../@types/TItem"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const postItemImage = async (data: IPostImage) => {
  const token = await AsyncStorage.getItem("AuthCode")
  const headers = {
    'Content-Type': 'application/json', 'Authorization': `Barrer ${token}`, "maxBodyLenght": "Infinity"
  }
  const id = await AsyncStorage.getItem('itemID')
  try {
    if (id) {
      await api.post(`/items/images/${id}`, data, { headers })
    }
    throw new Error("Id não gerado!")
  } catch (error: any) {
    return error
  }
}