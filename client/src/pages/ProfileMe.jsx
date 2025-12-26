import { useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";

import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import Textarea from "../components/ui/Textarea";
import Feed from "../components/layout/Feed";

import { updateProfile, uploadAvatar } from "../store/features/usersSlice";
import toast from "react-hot-toast";

export default function Profile() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);

  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(user?.bio || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar);

  if (!user) return null;

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  async function handleSave() {
    try {
      if (bio !== user.bio) {
        await dispatch(updateProfile({ bio })).unwrap();
      }

      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        await dispatch(uploadAvatar(formData)).unwrap();
      }

      toast.success("Profilo aggiornato");
      setEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Errore aggiornamento profilo");
    }
  }

  function handleCancel() {
    setBio(user.bio || "");
    setAvatarFile(null);
    setAvatarPreview(user.avatar);
    setEditing(false);
  }

  return (
    <div className="container pt-24 pb-20">
      {/* HEADER */}
      <header className="mb-14">
        <div className="flex items-start gap-8">
          {/* Avatar */}
          <div className="relative">
            <Avatar
              src={avatarPreview}
              username={user.username}
              size={96}
            />

            {editing && (
              <label className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/40 text-xs font-medium text-white opacity-0 transition hover:opacity-100">
                Cambia
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1>
              {user.username.charAt(0).toUpperCase() +
                user.username.slice(1)}
            </h1>

            {/* BIO */}
            {!editing ? (
              <p className="mt-3 max-w-xl text-muted">
                {user.bio || (
                  <span className="italic text-gray-800">
                    Nessuna bio inserita
                  </span>
                )}
              </p>
            ) : (
              <div className="mt-2 max-w-xl">
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Racconta qualcosa di te..."
                    rows={2}
                />
              </div>
            )}

            {/* STATS */}
            <div className="mt-4 flex gap-6 text-sm text-muted">
              <span>
                <strong className="text-black">
                  {user.followers?.length || 0}
                </strong>{" "}
                follower
              </span>
              <span>
                <strong className="text-black">
                  {user.following?.length || 0}
                </strong>{" "}
                seguiti
              </span>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex gap-3">
              {!editing ? (
                <Button
                  variant="secondary"
                  onClick={() => setEditing(true)}
                >
                  Modifica profilo
                </Button>
              ) : (
                <>
                  <Button onClick={handleSave}>Salva</Button>
                  <Button variant="ghost" onClick={handleCancel}>
                    Annulla
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="divider" />

      {/* POSTS */}
      <section>
        <Feed authorId={user._id} />
      </section>
    </div>
  );
}
