import { api } from "./axios/axiosConfig";

export const postEmail = async (data: string) => {
  const headers = { 'Content-Type': 'application/json' }
  try {
    await api.post(`/auth/generate`, JSON.stringify(data), { headers })
  } catch (error) {
    console.error('Erro ao enviar o email:', error);
  }
}