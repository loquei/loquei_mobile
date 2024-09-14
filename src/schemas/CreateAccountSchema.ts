import * as y from "yup";


export const CreateAccountSchema = y.object({
  name: y.string().required().trim().matches(/^[a-zA-ZçÇ\s]+$/),
  nickname: y.string().required().trim(),
  email: y.string().required().email().trim(),
  document: y.string().required().trim(),
  birthday: y.string().required().trim(),
  phone: y.string().required().trim().matches(/^\d{8,14}$/)

})