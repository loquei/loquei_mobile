import { api } from "./axios/axiosConfig"


export const deleteUser = async (data: string) => {
  const headers = { 'Content-Type': 'application/json' }
  try {
    await api.delete(`/users/${data}`)
  } catch (error: any) {
    return error.message
  }
}