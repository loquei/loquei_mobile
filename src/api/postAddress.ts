import { IPostAddress } from "../@types/TUser"
import { api } from "./axios/axiosConfig"

export const postAddress = async (data: IPostAddress) => {
  const headers = { 'Content-Type': 'application/json' }
  try {
    await api.post("/addresses", data, { headers })
  } catch {
    console.log("erro")
  }
}