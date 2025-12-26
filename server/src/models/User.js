import mongoose from "mongoose";

const { Schema } = mongoose;

/**
 * UserSchema defines the structure for the User model in MongoDB.
 *
 * Fields:
 * @property {String} username - The unique username of the user. Required, trimmed, 3-20 characters.
 * @property {String} email - The unique email address of the user. Required, lowercase, trimmed.
 * @property {String} passwordHash - The hashed password of the user. Required.
 * @property {String} [avatar] - The URL or path to the user's avatar image. Optional, defaults to an empty string.
 * @property {String} [bio] - The user's biography. Optional, defaults to an empty string, max 160 characters.
 * @property {Array<ObjectId>} [followers] - List of users following this user. References User documents.
 * @property {Array<ObjectId>} [following] - List of users this user is following. References User documents.
 * @property {Date} createdAt - Timestamp of when the user was created. Automatically managed.
 * @property {Date} updatedAt - Timestamp of the last update to the user. Automatically managed.
 */
const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlenght: 3,
			maxlength: 20,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			default: "",
		},
		bio: {
			type: String,
			default: "",
			maxlength: 160,
		},
		followers: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		following: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{ timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
export default User;
