import { api } from "./axios/axiosConfig"
import { IPostItem } from "../@types/TItem"

export const postItem = async (data: IPostItem) => {
  const headers = { 'Content-Type': 'application/json' }
  try {
    await api.post('/items', data, { headers })
  } catch (error: any) {
    return error
  }
}