import { api } from "./axios/axiosConfig";

export const postEmail = async (data: Email) => {
  const headers = { 'Content-Type': 'application/json' }
  try {
    console.log(JSON.stringify(data))
    console.log(api.defaults.baseURL + '/auth/generate');
    await api.post(`/auth/generate`, JSON.stringify(data), { headers })
  } catch (error) {
    console.error('Erro ao enviar o email:', error);
  }
}
