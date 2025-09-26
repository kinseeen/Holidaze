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
      <button
        onClick={handleChangeAvatar}
        disabled={loading}
        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
      >
        {loading ? "Updating..." : "Change profile picture"}
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default ChangeProfilePicture;
