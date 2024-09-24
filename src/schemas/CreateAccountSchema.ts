import * as y from "yup";


export const CreateAccountSchema = y.object({
  username: y.string().required().trim().matches(/^[a-zA-ZçÇ\s]+$/),
  personal_name: y.string().required().trim(),
  email: y.string().required().email().trim(),
  phone: y.string().required().trim().matches(/^\d{8,14}$/),
  document: y.string().required().trim(),
  birth: y.string().required().trim(),

})