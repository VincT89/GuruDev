import Joi from "joi";

// Schema for user update validation
export const updateProfileSchema = Joi.object({
  avatar: Joi.string().uri().optional().allow(""),
  bio: Joi.string().max(160).optional().allow(""),
});