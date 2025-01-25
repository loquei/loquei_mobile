import * as y from "yup";

export const PostItemSchema = y.object({
  id: y.string(),
  rating: y.number(),
  name:
    y.string()
      .required("É necessário inserir o nome do produto")
      .trim()
      .min(10, "O nome deve ter no mínimo 10 caracteres"),
  description: y
    .string()
    .required("É necessário inserir uma descrição")
    .trim()
    .min(10, "A descrição deve ter no mínimo 10 caracteres")
    .max(500),
  daily_value: y
    .number()
    .required("É necessário inserir um valor diário")
    .typeError("O valor diário deve ser um número.")
    .min(0.01, "O valor diário deve ser maior que zero.")
    .test(
      "is-decimal",
      "O valor deve ser um número decimal válido (use ponto como separador)",
      (value) => (value === undefined ? true : /^[0-9]+(\.[0-9]{1,2})?$/.test(value.toString()))
    ),
  min_days: y.number()
    .typeError("O valor mínimo de dias deve ser um número.")
    .min(1, "O valor mínimo de dias deve ser pelo menos 1.")
    .required("O valor mínimo de dias é obrigatório."),
  max_days: y
    .number()
    .typeError("O valor máximo de dias deve ser um número.")
    .required("O valor máximo de dias é obrigatório.")
    .test(
      "is-greater",
      "O valor máximo deve ser maior que o valor mínimo.",
      function (value) {
        const { min_days } = this.parent;
        return value > min_days;
      }
    ),
  categories: y
    .array()
    .of(y.string().required())
    .min(1, "Selecione ao menos uma categoria"),
});
