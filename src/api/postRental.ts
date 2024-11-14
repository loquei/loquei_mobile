import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './axios/axiosConfig';

export const postRental = async (lessorId: string, lesseeId: string, itemId: string, startDate: Date, endDate: Date) => {
  const token = await AsyncStorage.getItem("AuthToken");
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  const formattedStartDate = startDate.toISOString().slice(0, 19).replace('T', ' '); // Converte para o formato "yyyy-MM-dd HH:mm:ss"
  const formattedEndDate = endDate.toISOString().slice(0, 19).replace('T', ' ');

  try {
    const rental = {
      lessor: lessorId,
      lessee: lesseeId,
      item: itemId,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
    };

    console.log('Enviando requisição de aluguel:', rental);

    const response = await api.post('/rentals', rental, { headers });

    console.log('Resposta da API:', response.data);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Erro ao enviar requisição de aluguel. Status da resposta:", error.response.status);
      console.error("Mensagem de erro:", error.response.data);
      console.error("Cabeçalhos de resposta:", error.response.headers);
    } else if (error.request) {
      console.error("A requisição foi enviada, mas não obtivemos uma resposta.");
      console.error("Configuração da requisição:", error.request);
    } else {
      console.error("Erro ao configurar a requisição de aluguel:", error.message);
    }

  }
};
