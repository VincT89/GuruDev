import Joi from "joi";
/**
 * Register validation schema
 */
export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).trim().required(),
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().min(6).max(72).required(),
});

/**
 * Login validation schema
 */
export const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().required(),
});
