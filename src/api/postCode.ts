import { api } from "./axios/axiosConfig"

interface Iauth {
  email: string,
  code: string
}

export const postCode = async ({ email, code }: Iauth) => {
  const headers = { 'Content-Type': 'application/json' }
  try {
    await api.post('/auth/authenticate', JSON.stringify({ email, code }), { headers })
  } catch (error: any) {
    return error.message
  }
}