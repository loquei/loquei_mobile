import { api } from "./axios/axiosConfig"

export const create_user = async (data: create_user) => {
  const headers = { 'Content-Type': 'application/json' }
  try {
    await api.post('/users', JSON.stringify(data), { headers })
  } catch (error: any) {
    return error.message
  }
}