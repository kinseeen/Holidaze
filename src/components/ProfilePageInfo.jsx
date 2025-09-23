import { useParams, Link } from "react-router-dom";
import React from "react";
import { useGet } from "../hooks/ApiCalls";
import { useAuth } from "../hooks/AuthProvider";

import LogoutButton from "./LogoutButton";

function ProfilePageInfo() {
  const { user, loading: authLoading } = useAuth();
  const { name } = useParams();

  const { response, loading, error } = useGet(
    `/holidaze/profiles/${name}?bookings=true`
  );

  if (authLoading) return <p>Loading profile...</p>;
  if (!user) return <p> Please log in to view this page</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  console.log("Auth user:", user);

  const profile = response?.data;
  if (!profile) return <p>Profile not found</p>;

  const isVenueManager = profile.venueManager;
  const isOwnProfile = user?.name === profile.name;
  const bookings = profile?.bookings?.data || [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
      </div>
      <h3>{profile.email}</h3>
      <img
        src={profile.avatar?.url}
        alt={profile.name}
        className="w-full max-w-md rounded-xl shadow-lg mt-2"
      />

      {isOwnProfile && <LogoutButton />}

      <h3>Nr of bookings: {profile._count.bookings}</h3>

      {isOwnProfile ? (
        isVenueManager ? (
          <>
            <VenuesSection name={name} />
            <ManagerBookingsSection name={name} />
          </>
        ) : (
          <BookingsSection bookings={bookings} />
        )
      ) : isVenueManager ? (
        <VenuesSection name={name} />
      ) : (
        <p className="text-gray-500 mt-6">This user is not a venue manager.</p>
      )}
    </div>
  );
}

function BookingsSection({ bookings }) {
  return (
    <>
      <hr className="my-8 border-gray-300" />
      <div className="mt-8">
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-1 mb-3">
          Your Bookings
        </h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 border rounded-xl shadow-sm bg-white"
              >
                <p className="font-medium">
                  From: {new Date(booking.dateFrom).toLocaleDateString()}
                </p>
                <p className="font-medium">
                  To: {new Date(booking.dateTo).toLocaleDateString()}
                </p>
                <p>Guests: {booking.guests}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function VenuesSection({ name }) {
  const { response, loading, error } = useGet(
    `/holidaze/profiles/${name}/venues`
  );

  const venues = response?.data || [];

  return (
    <>
      <hr className="my-8 border-gray-300" />
      <div className="mt-8">
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-1 mb-3">
          Your Venues
        </h2>
        {loading && <p>Loading venues...</p>}
        {error && <p className="text-red-500">Error loading venues: {error}</p>}
        {venues.length === 0 ? (
          <p className="text-gray-500">No venues created yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {venues.map((venue) => (
              <Link
                key={venue.id}
                to={`/venues/${venue.id}`} // <-- route to your VenuePage
                className="block p-4 border rounded-xl shadow-sm bg-white hover:shadow-lg transition"
              >
                <img
                  src={venue.media?.[0]?.url}
                  alt={venue.media?.[0]?.alt || venue.name}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold">{venue.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {venue.description}
                </p>
                <p className="mt-2 font-medium">💰 ${venue.price} / night</p>
                <p className="text-sm text-gray-500">
                  Guests: {venue.maxGuests} | Rating: {venue.rating}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function ManagerBookingsSection({ name }) {
  // Fetch venues with bookings
  const { response, loading, error } = useGet(
    `/holidaze/profiles/${name}/venues?_bookings=true`
  );

  const venues = response?.data || [];

  // Flatten all bookings across venues
  const allBookings = venues.flatMap((venue) =>
    (venue.bookings || []).map((booking) => ({
      ...booking,
      venueName: venue.name,
    }))
  );

  return (
    <>
      <hr className="my-8 border-gray-300" />
      <div className="mt-8">
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-1 mb-3">
          Bookings for Your Venues
        </h2>
        {loading && <p>Loading bookings...</p>}
        {error && (
          <p className="text-red-500">Error loading bookings: {error}</p>
        )}
        {allBookings.length === 0 ? (
          <p className="text-gray-500">No bookings for your venues yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allBookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 border rounded-xl shadow-sm bg-white"
              >
                <h3 className="font-semibold">{booking.venueName}</h3>
                <p className="font-medium">
                  From: {new Date(booking.dateFrom).toLocaleDateString()}
                </p>
                <p className="font-medium">
                  To: {new Date(booking.dateTo).toLocaleDateString()}
                </p>
                <p>Guests: {booking.guests}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ProfilePageInfo;
