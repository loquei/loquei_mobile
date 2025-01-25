import * as y from "yup";

export const createRatingSchema = y.object({
  score: y.number().required("A nota é obrigatória").min(1, "A nota mínima é 1").max(5, "A nota máxima é 5"),
  description: y.string().required("O comentário é obrigatório").min(10, "O comentário deve ter no mínimo 10 caracteres"),
});