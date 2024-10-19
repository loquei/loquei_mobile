import * as y from "yup";


export const createAddressSchema = y.object({
  postal_code: y.string().trim().required(),
  street: y.string().trim().required(),
  neighborhood: y.string().trim().required(),
  city: y.string().trim().required(),
  state: y.string().trim(),
  country: y.string(),
  number: y.number(),
  main: y.boolean().required(),
  user_id: y.string(),
})