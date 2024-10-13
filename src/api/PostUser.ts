import { IPostUser } from "../@types/TUser"
import { api } from "./axios/axiosConfig"

export const create_user = async (data: IPostUser) => {
  const headers = { 'Content-Type': 'application/json' }
  try {
    await api.post('/users', JSON.stringify(data), { headers })
  } catch (error: any) {
    return error.message
  }
}