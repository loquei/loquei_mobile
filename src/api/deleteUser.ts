import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./axios/axiosConfig"

const getEmail = async () => {
  const email = await AsyncStorage.getItem("userEmail");
  return email;
};

export const deleteUser = async () => {
  const headers = { 'Content-Type': 'application/json' }
  const email = await getEmail();
  try {
    const response = await api.get(`/security/users/${email}`)
    await api.delete(`/users/${response.data.id}`)
  } catch (error: any) {
    return error.message
  }
}