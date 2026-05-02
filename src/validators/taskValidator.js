import Joi from "joi";

export const taskSchema = Joi.object({
  title: Joi.string().min(1).required(),
  priority: Joi.string().valid("low", "medium", "high").default("low")
});