import * as y from "yup";


export const createAddressSchema = y.object({
  postal_code: y.string().trim().required(),
  street: y.string().trim().required(),
  neighborhood: y.string().trim().required(),
  city: y.string().trim().required(),
  state: y.string().trim().required(),
  country: y.string().required().trim(),
  number: y.number().required(),
  main: y.boolean().required(),
  user_id: y.string().required().trim(),
})