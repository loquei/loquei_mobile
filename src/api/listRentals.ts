import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./axios/axiosConfig";

export const listRentals = async (userId: string) => {
  const token = await AsyncStorage.getItem("AuthToken");
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  try {
    console.log("Iniciando o processo de busca dos alugueis...");

    const response = await api.get(`/rentals/lessor/${userId}`, { headers });

    console.log("Busca de alugueis enviada com sucesso!");
    console.log("Resposta recebida:", response.data);

    return response.data;

  } catch (error: any) {
    console.error("Erro ao enviar requisição de busca de alugueis:", error.message);
    if (error.response) {
      console.error("Detalhes do erro da resposta:", error.response.data);
    }
    throw new Error("Falha na busca dos alugueis. Por favor, verifique os dados e tente novamente.");
  }
};
