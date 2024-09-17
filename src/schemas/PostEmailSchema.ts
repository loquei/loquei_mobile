import * as y from "yup";

export const PostEmailSchema = y.object({
  email: y.string().required().trim().email()
});