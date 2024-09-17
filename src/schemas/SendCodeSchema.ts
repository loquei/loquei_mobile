import * as y from "yup";

export const SendCodeSchema = y.object({
  code: y.string().required().trim()
});