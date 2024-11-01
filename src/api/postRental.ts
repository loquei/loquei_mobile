import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./axios/axiosConfig";
import { format } from "date-fns";

export const postRental = async (lessorId: string, lesseeId: string, itemId: string, rentalTime: number) => {
  const token = await AsyncStorage.getItem("AuthToken");
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  try {
    console.log("Iniciando o processo de criação do aluguel...");

    const startDate = new Date();
    // Multiplicando rentalTime por 24 * 60 * 60 * 1000 para converter dias em milissegundos
    const endDate = new Date(startDate.getTime() + rentalTime * 24 * 60 * 60 * 1000);

    // Formata as datas para "YYYY-MM-DD HH:mm:ss"
    const formattedStartDate = format(startDate, 'yyyy-MM-dd HH:mm:ss');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd HH:mm:ss');

    const rental = {
      lessor: lessorId,
      lessee: lesseeId,
      item: itemId,
      start_date: formattedStartDate,
      end_date: formattedEndDate
    };

    console.log("Dados formatados do aluguel prontos para envio:", rental);

    const response = await api.post('/rentals', rental, { headers });

    console.log("Requisição de aluguel enviada com sucesso!");
    console.log("Resposta recebida:", response.data);

    return response.data;

  } catch (error: any) {
    console.error("Erro ao enviar requisição de aluguel:", error.message);
    if (error.response) {
      console.error("Detalhes do erro da resposta:", error.response.data);
    }
    throw new Error("Falha na criação do aluguel. Por favor, verifique os dados e tente novamente.");
  }
};
