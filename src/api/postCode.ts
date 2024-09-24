import { api } from "./axios/axiosConfig"
import AsyncStorage from "@react-native-async-storage/async-storage";
interface Iauth {
  email: string,
  code: string
}

export const postCode = async ({ email, code }: Iauth) => {
  const headers = { 'Content-Type': 'application/json' }
  try {
    const response = await api.post('/security/auth/authenticate', { email, code }, { headers })
    await AsyncStorage.setItem("AuthCode", response.data.token)
  } catch (error: any) {
    return error.message
  }
}