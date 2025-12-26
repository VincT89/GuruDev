import Joi from "joi";

/**
 * Schema for validating the creation of a post.
 * - title: Required string, 3-120 characters, trimmed.
 * - content: Required string, minimum 10 characters.
 * - status: Optional string, must be 'draft', 'published', or 'archived'. Defaults to 'draft'.
 * - coverImage: Optional string, must be a valid URI.
 */


export const createPostSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  content: Joi.string().min(1).required(),
  status: Joi.string()
    .valid("published", "draft")
    .default("published"),
});


/**
 * Schema for validating the update of a post.
 * - title: Optional string, 3-120 characters, trimmed.
 * - content: Optional string, minimum 10 characters.
 * - status: Optional string, must be 'draft', 'published', or 'archived'.
 * - coverImage: Optional string, must be a valid URI or an empty string.
 * At least one field must be provided for update.
 */
export const updatePostSchema = Joi.object({
	title: Joi.string().min(3).max(120).trim(), // Title is optional, must be between 3 and 120 characters if provided
	content: Joi.string().min(10), // Content is optional, minimum 10 characters if provided
	status: Joi.string().valid("draft", "published", "archived"), // Status is optional, must be one of the allowed values
}).min(1); // At least one field must be present in the update
