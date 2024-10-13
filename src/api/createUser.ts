import { api } from "./axios/axiosConfig"
import { IPostUser } from "../@types/TUser"


export const createUser = async (data: IPostUser) => {
  const headers = { 'Content-Type': 'application/json' }
  try {
    await api.post('/users', data, { headers })
  } catch (error: any) {
    return error
  }
}