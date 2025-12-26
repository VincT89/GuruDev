import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchUserProfile, toggleFollowUser } from "../store/features/usersSlice";

import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import Feed from "../components/layout/Feed";

export default function ProfileUser() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const profile = useAppSelector((s) => s.users.profile);
  const authUserId = useAppSelector((s) => s.auth.user?._id);

  const isFollowing = profile?.followers?.includes(authUserId);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserProfile(id));
    }
  }, [id, dispatch]);

  if (!profile) {
    return <p className="pt-24 text-center">Caricamento profilo…</p>;
  }

  return (
    <div className="container pt-24 pb-20">
      {/* HEADER */}
      <header className="mb-14">
        <div className="flex items-start gap-8">
          <Avatar
            src={profile.avatar}
            username={profile.username}
            size={96}
          />

          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {profile.username.charAt(0).toUpperCase() + profile.username.slice(1)}
            </h1>

            <p className="mt-3 max-w-xl text-muted">
              {profile.bio || "Nessuna bio"}
            </p>

            <div className="mt-4 flex gap-6 text-sm text-muted">
              <span>
                <strong className="text-black">
                  {profile.followersCount}
                </strong>{" "}
                follower
              </span>
              <span>
                <strong className="text-black">
                  {profile.followingCount}
                </strong>{" "}
                seguiti
              </span>
            </div>

            {/* FOLLOW BUTTON */}
            {authUserId !== profile._id && (
              <div className="mt-6">
                <Button
                  variant={isFollowing ? "secondary" : "primary"}
                  onClick={() =>
                    dispatch(toggleFollowUser(profile._id))
                  }
                >
                  {isFollowing ? "Segui già" : "Segui"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="divider" />

      {/* POSTS */}
      <section>
        <Feed authorId={profile._id} />
      </section>
    </div>
  );
}
