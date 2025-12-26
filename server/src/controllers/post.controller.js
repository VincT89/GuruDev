import slugify from "slugify";
import cloudinary from "../config/cloudinary.js";
import { Post } from "../models/index.js";
import Like from "../models/Like.js";
import Comment from "../models/Comment.js";
import { createPostSchema, updatePostSchema } from "../validation/index.js";

/**
 * CREATE POST
 * Handles the creation of a new post.
 * Validates the request body, generates a slug, and saves the post to the database.
 */
export async function createPost(req, res, next) {
	try {
		// Validate request body
		const { value, error } = createPostSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.message });
		}

		const { title, content, status } = value;

		// Handle cover image if uploaded
		let coverImage = "";
		if (req.file) coverImage = req.file.filename;

		// Generate slug from title
		let slug = slugify(title, { lower: true, strict: true });
		const slugExists = await Post.findOne({ slug });
		if (slugExists) slug = `${slug}-${Date.now()}`;

		// Create and save the post
		const post = await Post.create({
			title,
			slug,
			content,
			status,
			coverImage,
			author: req.user._id,
		});

		res.status(201).json(post);
	} catch (err) {
		next(err);
	}
}

/**
 * GET ALL PUBLISHED POSTS
 * Retrieves all posts with status "published", sorted by creation date.
 */
export async function getPosts(req, res, next) {
	try {
		const posts = await Post.find({ status: "published" })
			.populate("author", "username avatar")
			.sort({ createdAt: -1 });

		res.json(posts);
	} catch (err) {
		next(err);
	}
}

/**
 * GET POST BY SLUG
 * Retrieves a single published post by its slug.
 */
export async function getPostBySlug(req, res, next) {
	try {
		const post = await Post.findOne({
			slug: req.params.slug,
			status: "published",
		}).populate("author", "username avatar");

		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		res.json(post);
	} catch (err) {
		next(err);
	}
}

/**
 * GET POST BY ID
 * Retrieves a post by its ID.
 * Route: GET /api/posts/id/:id
 */
export async function getPostById(req, res, next) {
	try {
		const post = await Post.findById(req.params.id).populate(
			"author",
			"username avatar"
		);

		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		res.json(post);
	} catch (err) {
		next(err);
	}
}

/**
 * UPDATE POST
 * Updates an existing post.
 * Validates input, checks permissions, updates fields, and saves the post.
 */
export async function updatePost(req, res, next) {
	try {
		// Validate request body
		const { value, error } = updatePostSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.message });
		}

		// Find the post by ID
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		// Check if the user is the author
		if (post.author.toString() !== req.user._id.toString()) {
			return res.status(403).json({ message: "Forbidden" });
		}

		// Update title and slug if title is changed
		if (value.title) {
			let newSlug = slugify(value.title, { lower: true, strict: true });
			const slugExists = await Post.findOne({
				slug: newSlug,
				_id: { $ne: post._id },
			});
			if (slugExists) newSlug = `${newSlug}-${Date.now()}`;

			post.title = value.title;
			post.slug = newSlug;
		}

		// Update other fields if provided
		if (value.content !== undefined) post.content = value.content;
		if (value.coverImage !== undefined) post.coverImage = value.coverImage;
		if (value.status !== undefined) post.status = value.status;

		await post.save();

		res.json(post);
	} catch (err) {
		next(err);
	}
}

/**
 * HARD DELETE POST
 * Deletes a post and all related comments and likes permanently.
 * Route: DELETE /api/posts/:id
 */
export async function deletePost(req, res, next) {
	try {
		// Find the post by ID
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		// Check if the user is the author
		if (post.author.toString() !== req.user._id.toString()) {
			return res.status(403).json({ message: "Forbidden" });
		}

		// Delete related comments, likes, and the post itself
		await Promise.all([
			Comment.deleteMany({ post: post._id }),
			Like.deleteMany({ post: post._id }),
			Post.findByIdAndDelete(post._id),
		]);

		res.json({ message: "Post deleted permanently" });
	} catch (err) {
		next(err);
	}
}

/**
 * UPLOAD COVER IMAGE
 * Uploads a cover image for a post to Cloudinary and updates the post.
 */
export async function uploadPostCover(req, res, next) {
	try {
		// Check if a file was uploaded
		if (!req.file) {
			return res.status(400).json({ message: "Nessun file caricato" });
		}

		// Upload image to Cloudinary
		const uploadResult = await cloudinary.uploader.upload(
			`data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
			{
				folder: "post-covers",
				transformation: [{ width: 1200, height: 630, crop: "fill" }],
			}
		);

		// Update the post with the new cover image URL
		const post = await Post.findByIdAndUpdate(
			req.params.id,
			{ coverImage: uploadResult.secure_url },
			{ new: true }
		);

		res.json({ coverImage: post.coverImage });
	} catch (err) {
		next(err);
	}
}
