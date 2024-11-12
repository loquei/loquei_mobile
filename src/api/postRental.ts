import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./axios/axiosConfig";
import { format } from "date-fns";

export const postRental = async (lessorId: string, lesseeId: string, itemId: string, startDate: Date, endDate: Date) => {
  const token = await AsyncStorage.getItem("AuthToken");
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  try {
    const formattedStartDate = format(startDate, 'yyyy-MM-dd HH:mm:ss');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd HH:mm:ss');

    const rental = {
      lessor: lessorId,
      lessee: lesseeId,
      item: itemId,
      start_date: formattedStartDate,
      end_date: formattedEndDate
    };

    const response = await api.post('/rentals', rental, { headers });
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar requisição de aluguel:", error);
    throw new Error("Falha na criação do aluguel.");
  }
};
