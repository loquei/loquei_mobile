import { Temail } from "../@types/TEmail";
import { api } from "./axios/axiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const postEmail = async (email: Temail) => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const response = await api.post('/security/auth/generate', email, { headers });
    console.log(email)
    console.log("Response:", response);
    console.log("Temp Token:", response.data.token);

    await AsyncStorage.setItem("tempAuth", JSON.stringify({
      email: email.email,
      token: response.data.token,
    }));

    return response.status;
  } catch (error: any) {
    return error.response.status;
  }

}

