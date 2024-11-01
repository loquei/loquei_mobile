import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./axios/axiosConfig";

export const refuseRental = async (rentalId: string) => {
  const token = await AsyncStorage.getItem("AuthToken");
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  try {
    console.log("Iniciando o processo de recusar a locacao...");

    const response = await api.put(`/rentals/refuse/${rentalId}`, null, { headers });

    console.log("Recusa de locacao enviada com sucesso!");
    console.log("Resposta recebida:", response.data);

    return response.data;

  } catch (error: any) {
    console.error("Erro ao enviar requisição de recusar de locacao:", error.message);
    if (error.response) {
      console.error("Detalhes do erro da resposta:", error.response.data);
    }
    throw new Error("Falha ao recusar locacao. Por favor, verifique os dados e tente novamente.");
  }
};
