import * as y from "yup";

export const PostItemSchema = y.object({
  name: y.string().required().trim(),
  description: y.string().required().trim(),
  daily_value: y.number().required().positive(),
  max_days: y.number().required().positive(),
  min_days: y.number().required().positive(),
  categories_id: y.array(y.string().required().trim())
})