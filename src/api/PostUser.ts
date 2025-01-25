import { IPostUser } from "../@types/TUser";
import { api } from "./axios/axiosConfig";

export const create_user = async (data: IPostUser) => {
  const headers = { 'Content-Type': 'application/json' };
  try {
    const response = await api.post('/users', JSON.stringify(data), { headers });
    console.log("Usuário criado com sucesso:", response.status, response.data);
  } catch (error: any) {
    if (error.response) {
      console.error("Erro ao criar usuário:", error.response.status, error.response.data);
      return `Erro ${error.response.status}: ${error.response.data?.message || error.response.data}`;
    } else if (error.request) {
      console.error("Erro na requisição, sem resposta:", error.request);
      return "Erro na requisição, sem resposta do servidor.";
    } else {
      console.error("Erro inesperado:", error.message);
      return `Erro inesperado: ${error.message}`;
    }
  }
};
