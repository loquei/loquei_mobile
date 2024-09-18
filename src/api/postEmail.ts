import { Temail } from "../@types/TEmail";
import { api } from "./axios/axiosConfig";

export const postEmail = async (data: Temail) => {
  const headers = { 'Content-Type': 'application/json' }
  try {
    console.log(JSON.stringify(data))
    await api.post(`/security/auth/generate`, JSON.stringify(data), { headers })
  } catch (error) {
    console.error('Erro ao enviar o email:', error);
  }
}