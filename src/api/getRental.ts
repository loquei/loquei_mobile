import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./axios/axiosConfig";

export const getRental = async (rentalId: string) => {
  const token = await AsyncStorage.getItem("AuthToken");
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  try {
    console.log("Iniciando o processo de busca do aluguel...");

    const response = await api.get(`/rentals/${rentalId}`, { headers });

    console.log("Busca de aluguel enviada com sucesso!");
    console.log("Resposta recebida:", response.data);

    return response.data;

  } catch (error: any) {
    console.error("Erro ao enviar requisição de busca de aluguel:", error.message);
    if (error.response) {
      console.error("Detalhes do erro da resposta:", error.response.data);
    }
    throw new Error("Falha na busca do aluguel. Por favor, verifique os dados e tente novamente.");
  }
};
