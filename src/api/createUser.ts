import { api } from "./axios/axiosConfig"

export const createUser = async (data: createUser) => {
  console.log('Create user', JSON.stringify(data))
  const headers = { 'Content-Type': 'application/json' }
  try {
    await api.post('/users', JSON.stringify(data), { headers })
  } catch (error: any) {
    return error
  }
}