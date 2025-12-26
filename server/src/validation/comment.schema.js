import Joi from "joi";

/**
 * Create comment validation
 */
export const createCommentSchema = Joi.object({
  content: Joi.string()
    .min(1)
    .max(500)
    .required()
});
