import * as y from "yup";

export const PostItemSchema = y.object({
  id: y.string(),
  rating: y.number(),
  name: y.string().required("E necessario inserir o nome do produto").trim(),
  description: y.string().required("E necessario inserir uma descrição").trim().max(500),
  daily_value: y.number().required("E necessario inserir uma valor diário").positive("O número deve ser positivo"),
  max_days: y.number().required("E necessario colocar um número máximo de dias").positive("O número deve ser maior que 0"),
  min_days: y.number().required("E necessario colocar um número mínimo de dias").positive("O número deve ser maior que 0"),
  categories: y.array(y.string().required().trim()).required("E necessario selecionar uma categoria")
})