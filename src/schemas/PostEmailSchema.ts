import * as y from "yup";

export const PostEmailSchema = y.object({
  email: y
    .string()
    .required("O email é obrigatório")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      "Digite um email válido"
    ),
});