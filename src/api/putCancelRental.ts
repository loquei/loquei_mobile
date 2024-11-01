import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./axios/axiosConfig";

export const cancelRental = async (rentalId: string, reason: string) => {
  const token = await AsyncStorage.getItem("AuthToken");
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  try {
    console.log("Iniciando o processo de cancelar a locacao...");

    const cancelationData = { id: rentalId, cancellation_reason: reason };

    const response = await api.put(`/rentals/cancel/${rentalId}`, cancelationData, { headers });

    console.log("Cancelamento de locacao enviado com sucesso!");
    console.log("Resposta recebida:", response.data);

    return response.data;

  } catch (error: any) {
    console.error("Erro ao enviar requisição do cancelamento de locacao:", error.message);
    if (error.response) {
      console.error("Detalhes do erro da resposta:", error.response.data);
    }
    throw new Error("Falha no cancelamento de locacao. Por favor, verifique os dados e tente novamente.");
  }
};
