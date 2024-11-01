import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./axios/axiosConfig";

export const acceptRental = async (rentalId: string) => {

  const token = await AsyncStorage.getItem("AuthToken");
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  try {
    console.log("Iniciando o processo de aceitar a locacao...");

    const response = await api.put(`/rentals/accept/${rentalId}`, null, { headers });

    console.log("Aceitacao de locacao enviada com sucesso!");
    console.log("Resposta recebida:", response.data);

    return response.data;

  } catch (error: any) {
    console.error("Erro ao enviar requisição de aceitacao de locacao:", error.message);
    if (error.response) {
      console.error("Detalhes do erro da resposta:", error.response);
    }
    throw new Error("Falha na aceitacao de locacao. Por favor, verifique os dados e tente novamente.");
  }
};
