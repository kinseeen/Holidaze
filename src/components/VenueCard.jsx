import React from "react";
import { Link } from "react-router-dom";
import { useDelete } from "../../hooks/ApiCalls";
import EditVenueModal from "../EditVenue";

export default function VenueCard({ venue, onDelete, onUpdate }) {
  const { del, loading: deleting, error: deleteError } = useDelete(
    `/holidaze/venues/${venue.id}`
  );
  const [isEditOpen, setIsEditOpen] = React.useState(false);

  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white">
      <Link to={`/venues/${venue.id}`} className="block">
        <img
          src={venue.media?.[0]?.url}
          alt={venue.media?.[0]?.alt || venue.name}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
        <h3 className="text-lg font-semibold">{venue.name}</h3>
      </Link>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => setIsEditOpen(true)}
          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Edit Venue
        </button>
        <button
          onClick={async () => {
            if (confirm("Are you sure you want to delete this venue?")) {
              await del();
              onDelete(venue.id);
            }
          }}
          className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          disabled={deleting}
        >
          Delete
        </button>
      </div>

      {deleteError && (
        <p className="text-red-500 text-sm mt-2">{deleteError}</p>
      )}

      {isEditOpen && (
        <EditVenueModal
          venue={venue}
          onClose={() => setIsEditOpen(false)}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
}