import { usePut } from "../hooks/ApiCalls";

function ChangeProfilePicture({ profile, onUpdate }) {
  const { put, loading, error } = usePut(`/holidaze/profiles/${profile.name}`);

  const handleChangeAvatar = async () => {
    const newUrl = prompt("Enter new image URL:");
    if (!newUrl) return;

    const updated = await put({
      avatar: {
        url: newUrl,
        alt: `${profile.name}'s profile picture`,
      },
    });

    if (updated) {
      onUpdate(updated);
    }
  };

  return (
    <div className="mt-3">
      <span
        onClick={handleChangeAvatar}
        className={`text-blue-600 underline cursor-pointer ${
          loading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {loading ? "Updating..." : "Change profile picture"}
      </span>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default ChangeProfilePicture;
