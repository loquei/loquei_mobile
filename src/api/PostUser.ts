import axios from "axios"
import { IPostUser } from "../@types/TUserData"
import { api } from "./axios/axiosConfig"

export const create_user = async (data: IPostUser) => {
  console.log(api + '/users')
  const headers = { 'Content-Type': 'application/json' }
  try {
    await api.post('/users', JSON.stringify(data), { headers })
  } catch (error: any) {
    return error.message
  }
}