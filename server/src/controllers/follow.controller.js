import { User } from "../models/index.js";

/**
 * FOLLOW / UNFOLLOW USER
 * POST /api/users/:id/follow
 * Auth required
 */
export async function toggleFollow(req, res, next) {
  try {
    // Get target user ID and current user ID
    const targetUserId = req.params.id;
    const currentUserId = req.user._id.toString();

    // prevent self-follow
    if (targetUserId === currentUserId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    // Find target user and current user
    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);
    // Check if users exist
    if (!targetUser || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if current user is already following target user
    const isFollowing = currentUser.following.includes(targetUserId);

    // UNFOLLOW
    if (isFollowing) {
      currentUser.following.pull(targetUserId);
      targetUser.followers.pull(currentUserId);

      // save changes
      await currentUser.save(); 
      await targetUser.save(); 

      return res.json({ following: false });
    }

    // FOLLOW
    currentUser.following.push(targetUserId);
    targetUser.followers.push(currentUserId);

    await currentUser.save();
    await targetUser.save();

    return res.json({ following: true });
  } catch (err) {
    next(err);
    console.error(err);
  }
}

/**
 * GET USER FOLLOWERS
 * GET /api/users/:id/followers
 * Public
 */
export async function getFollowers(req, res, next) {
  try {
    // Find user and populate followers
    const user = await User.findById(req.params.id)
      .populate("followers", "username avatar");
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.followers);
  } catch (err) {
    next(err);
    console.error(err);
  }
}

/**
 * GET USER FOLLOWING
 * GET /api/users/:id/following
 * Public
 */
export async function getFollowing(req, res, next) {
  try {
    // Find user and populate following
    const user = await User.findById(req.params.id)
      .populate("following", "username avatar");
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.following);
  } catch (err) {
    next(err);
    console.error(err);
  }
}
