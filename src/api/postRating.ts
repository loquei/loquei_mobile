import { IPostRating } from "../@types/TRating";
import { api } from "./axios/axiosConfig";

export const postRating = async (data: IPostRating) => {
  const headers = { 'Content-Type': 'application/json' }
  try {
    await api.post("/ratings", data, { headers })
  } catch {
    console.log("deu erro")
  }
}