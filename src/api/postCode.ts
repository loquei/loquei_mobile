import { api } from "./axios/axiosConfig"
import AsyncStorage from "@react-native-async-storage/async-storage";
interface Iauth {
  email: string,
  code: string
}

export const postCode = async ({ email, code }: Iauth) => {
  const tempAuthToken = await AsyncStorage.getItem("tempAuthToken")
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tempAuthToken}` }
  try {
    const response = await api.post('/security/auth/authenticate', { email, code }, { headers })
    await AsyncStorage.setItem("AuthToken", response.data.token)
    console.log("Auth Token:", response.data.token)
  } catch (error: any) {
    return error.message
  }
}