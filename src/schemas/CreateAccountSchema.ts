import { z } from "zod";


export const CreateAccountSchema = z.object({
  name: z.string({ required_error: "O nome é necessario" }).min(1).trim().toLowerCase(),
  nickName: z.string({ required_error: "O nome de usuário é necessario" }).min(1).trim().toLowerCase(),
  email: z.string(({
    required_error: "O email é necessario"
  })).email({
    message: "Insira um e-mail valido"
  }).trim().toLowerCase(),
  phone: z.string({
    required_error: "O número de telefone é necessario"
  }),
  document: z.string({
    required_error: "O CPF é necessario"
  }).trim().min(1),
  BirthDate: z.string({
    required_error: 'Sua data de nascimento é necessaria'
  }).trim()
})