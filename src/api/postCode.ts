import { api } from "./axios/axiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IAuth {
  email: string;
  code: string;
}

export const postCode = async ({ email, code }: IAuth) => {
  const tempAuth = await AsyncStorage.getItem("tempAuth");
  if (!tempAuth) {
    throw new Error("No tempAuth found in AsyncStorage");
  }
  const { token } = JSON.parse(tempAuth);

  console.log("Temp Token:", token);

  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  try {
    const response = await api.post('/security/auth/authenticate', { email, code }, { headers });

    await AsyncStorage.setItem("AuthToken", response.data.token);
    return response;
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 422) {
        return `Não é possível autenticar o usuário com o email: ${email}. Verifique suas credenciais ou tente novamente.`;
      }

      return `Erro ${status}: ${data.message || "Erro desconhecido"}`;
    } else if (error.request) {
      return "Erro na requisição. Por favor, verifique sua conexão com a internet.";
    } else {
      return "Ocorreu um erro desconhecido. Tente novamente mais tarde.";
    }
  }
};
