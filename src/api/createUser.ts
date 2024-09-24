import { api } from "./axios/axiosConfig"
import { ICreateUser } from "../@types/TUserData"


export const createUser = async (data: ICreateUser) => {
  const headers = { 'Content-Type': 'application/json' }
  try {
    await api.post('/users', data, { headers })
  } catch (error: any) {
    return error
  }
}