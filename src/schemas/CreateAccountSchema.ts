import * as y from "yup";

export const CreateAccountSchema = y.object({
  personal_name: y.string().required("O nome é obrigatório"),
  username: y.string().required("O nome de usuário é obrigatório"),
  email: y
    .string()
    .required("O email é obrigatório")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      "Digite um email válido"
    ),
  document: y
    .string()
    .required("O CPF é obrigatório")
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Digite um CPF válido"),
  birth: y
    .string()
    .required("A data de nascimento é obrigatória")
    .matches(
      /^\d{2}\/\d{2}\/\d{4}$/,
      "A data de nascimento deve estar no formato DD/MM/AAAA"
    ),
  phone: y
    .string()
    .required("O telefone é obrigatório")
    .min(11, "Digite um telefone válido")
    .matches(/^\d{11}$/, "Digite um telefone válido"),
});