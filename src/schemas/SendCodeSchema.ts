import * as y from "yup";

export const SendCodeSchema = y.object({
  code: y.string().required(
    "O código é obrigatório"
  ).trim().length(6, "O código deve ter 6 dígitos"),
});