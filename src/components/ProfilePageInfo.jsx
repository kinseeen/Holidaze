// import { useParams, Link } from "react-router-dom";
// import React from "react";
// import { useGet, useDelete } from "../hooks/ApiCalls";
// import { useAuth } from "../hooks/AuthProvider";
// import CustomButtonBig from "./CustomButtonBig";
// import LogoutButton from "./LogoutButton";
// import CustomButtonSmall from "./CustomButtonSmall";
// import EditVenueModal from "./EditVenue";
// import ChangeProfilePicture from "./ChangeProfilePicture";

// function ProfilePageInfo() {
//   const { user, loading: authLoading } = useAuth();
//   const { name } = useParams();

//   const { response, loading, error } = useGet(
//     `/holidaze/profiles/${name}?_bookings=true&_venue=true`
//   );

//   const {
//     response: venuesResponse,
//     loading: venuesLoading,
//     error: venuesError,
//   } = useGet(`/holidaze/profiles/${name}/venues?_bookings=true&_customer=true`);

//   if (authLoading) return <p>Loading profile...</p>;
//   if (!user) return <p>Please log in to view this page</p>;
//   if (error) return <p className="text-red-500">Error: {error}</p>;

//   const profile = response?.data;
//   if (!profile) return <p>Profile not found</p>;
//   const bookings = profile?.bookings || [];

//   const isVenueManager = profile.venueManager;
//   const isOwnProfile = user?.name === profile.name;

//   const venueBookings =
//     venuesResponse?.data?.flatMap((venue) =>
//       (venue.bookings || []).map((booking) => ({
//         ...booking,
//         venueName: venue.name,
//       }))
//     ) || [];

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
//         {profile.name}
//       </h1>
//       <div className="flex flex-col md:flex-row gap-8">
//         <div className="md:w-1/3 flex flex-col items-center">
//           <img
//             src={profile.avatar?.url}
//             alt={profile.name}
//             className="w-48 h-48 object-cover rounded-xl shadow-lg mb-4"
//           />
//           {isOwnProfile && (
//             <>
//               <ChangeProfilePicture
//                 profile={profile}
//                 onUpdate={(updatedProfile) => {
//                   response.data = updatedProfile;
//                 }}
//               />
//               <LogoutButton />
//             </>
//           )}
//         </div>
//         <div className="md:w-2/3 space-y-6">
//           <div>
//             <h3 className="text-xl font-semibold">Email:</h3>
//             <p>{profile.email}</p>
//           </div>

//           {isOwnProfile && !isVenueManager && (
//             <BookingsSection bookings={bookings} />
//           )}

//           {isVenueManager && (
//             <ManagerBookingsSection bookings={venueBookings} />
//           )}

//           {isVenueManager && <VenuesSection name={name} />}

//           {!isOwnProfile && !isVenueManager && (
//             <p className="text-gray-500 mt-6">
//               This user is not a venue manager.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function BookingsSection({ bookings }) {
//   return (
//     <div>
//       <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-1 mb-4">
//         My Bookings
//       </h2>

//       {bookings.length === 0 ? (
//         <p className="text-gray-500">No bookings yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {bookings.map((booking) => (
//             <div
//               key={booking.id}
//               className="p-4 border rounded-xl shadow-sm bg-white"
//             >
//               {booking.venue && (
//                 <p className="font-medium">Venue: {booking.venue.name}</p>
//               )}
//               <p className="font-medium">
//                 From: {new Date(booking.dateFrom).toLocaleDateString()}
//               </p>
//               <p className="font-medium">
//                 To: {new Date(booking.dateTo).toLocaleDateString()}
//               </p>
//               <p>Guests: {booking.guests}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function ManagerBookingsSection({ bookings }) {
//   return (
//     <div>
//       <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-1 mb-4">
//         Bookings for My Venues
//       </h2>

//       {bookings.length === 0 ? (
//         <p className="text-gray-500">No bookings for your venues yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {bookings.map((booking) => (
//             <div
//               key={booking.id}
//               className="p-4 border rounded-xl shadow-sm bg-white"
//             >
//               <p className="font-medium">Venue: {booking.venueName}</p>
//               <p className="font-medium">
//                 From: {new Date(booking.dateFrom).toLocaleDateString()}
//               </p>
//               <p className="font-medium">
//                 To: {new Date(booking.dateTo).toLocaleDateString()}
//               </p>
//               <p>Guests: {booking.guests}</p>

//               {booking.customer && (
//                 <div className="mt-2 text-sm text-gray-600">
//                   <p>
//                     Customer:{" "}
//                     <span className="font-medium">{booking.customer.name}</span>
//                   </p>
//                   <p>Email: {booking.customer.email}</p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function VenueCard({ venue, onDelete, onUpdate }) {
//   const {
//     del,
//     loading: deleting,
//     error: deleteError,
//   } = useDelete(`/holidaze/venues/${venue.id}`);
//   const [isEditOpen, setIsEditOpen] = React.useState(false);

//   return (
//     <div className="p-4 border rounded-xl shadow-sm bg-white">
//       <Link to={`/venues/${venue.id}`} className="block">
//         <img
//           src={venue.media?.[0]?.url}
//           alt={venue.media?.[0]?.alt || venue.name}
//           className="w-full h-48 object-cover rounded-lg mb-3"
//         />
//         <h3 className="text-lg font-semibold">{venue.name}</h3>
//       </Link>

//       <div className="flex gap-2 mt-3">
//         <button
//           onClick={() => setIsEditOpen(true)}
//           className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//         >
//           Edit Venue
//         </button>
//         <button
//           onClick={async () => {
//             if (confirm(`Delete "${venue.name}"?`)) {
//               await del();
//               onDelete(venue.id);
//             }
//           }}
//           disabled={deleting}
//           className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 disabled:opacity-50"
//         >
//           {deleting ? "Deleting..." : "Delete"}
//         </button>
//       </div>
//       {deleteError && (
//         <p className="text-red-500 text-sm mt-1">{deleteError}</p>
//       )}
//       <EditVenueModal
//         open={isEditOpen}
//         onClose={() => setIsEditOpen(false)}
//         venue={venue}
//         onUpdate={onUpdate}
//       />
//     </div>
//   );
// }

// function VenuesSection({ name }) {
//   const { response, loading, error } = useGet(
//     `/holidaze/profiles/${name}/venues`
//   );
//   const [myVenues, setMyVenues] = React.useState([]);

//   React.useEffect(() => {
//     if (response?.data) {
//       setMyVenues(response.data);
//     }
//   }, [response]);

//   const handleDeleteVenue = (id) => {
//     setMyVenues((prev) => prev.filter((venue) => venue.id !== id));
//   };

//   const handleUpdateVenue = (updatedVenue) => {
//     setMyVenues((prev) =>
//       prev.map((venue) => (venue.id === updatedVenue.id ? updatedVenue : venue))
//     );
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-1 mb-4">
//         Venues
//       </h2>

//       {loading && <p>Loading venues...</p>}
//       {error && <p className="text-red-500">Error loading venues: {error}</p>}
//       {myVenues.length === 0 ? (
//         <p className="text-gray-500">No venues created yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {myVenues.map((venue) => (
//             <VenueCard
//               key={venue.id}
//               venue={venue}
//               onDelete={handleDeleteVenue}
//               onUpdate={handleUpdateVenue}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProfilePageInfo;

import { useParams, Link } from "react-router-dom";
import React from "react";
import { useGet, useDelete } from "../hooks/ApiCalls";
import { useAuth } from "../hooks/AuthProvider";
import { useState } from "react";
import CustomButtonBig from "./CustomButtonBig";
import LogoutButton from "./LogoutButton";
import EditVenueModal from "./EditVenue";
import ChangeProfilePicture from "./ChangeProfilePicture";
import CreateVenueModal from "./CreateVenue";

function ProfilePageInfo() {
  const { user, loading: authLoading } = useAuth();
  const { name } = useParams();
  const [createOpen, setCreateOpen] = React.useState(false);

  const { response, loading, error } = useGet(
    `/holidaze/profiles/${name}?_bookings=true&_venue=true`
  );

  const { response: venuesResponse } = useGet(
    `/holidaze/profiles/${name}/venues?_bookings=true&_customer=true`
  );

  if (authLoading) return <p>Loading profile...</p>;
  if (!user) return <p>Please log in to view this page</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const profile = response?.data;
  if (!profile) return <p>Profile not found</p>;
  const bookings = profile?.bookings || [];

  const isVenueManager = profile.venueManager;
  const isOwnProfile = user?.name === profile.name;

  const venueBookings =
    venuesResponse?.data?.flatMap((venue) =>
      (venue.bookings || []).map((booking) => ({
        ...booking,
        venueName: venue.name,
      }))
    ) || [];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="pt-20 flex flex-col md:flex-row items-center md:items-start gap-10">
        <div className="flex flex-col items-center md:w-1/3">
          <img
            src={profile.avatar?.url || "/default-avatar.png"}
            alt={profile.name}
            className="w-48 h-48 object-cover rounded-full border-4 border-gray-200 shadow-md mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {profile.name}
          </h1>
          <p className="text-gray-600 mb-4">{profile.email}</p>

          {isOwnProfile && (
            <div className="flex items-center flex-col  gap-3 w-full">
              <ChangeProfilePicture profile={profile} />
              <LogoutButton className="w-full" />
            </div>
          )}
        </div>
        <div className="md:w-2/3 space-y-8">
          {!isVenueManager && isOwnProfile && (
            <BookingsSection bookings={bookings} />
          )}
          {isVenueManager && (
            <ManagerBookingsSection bookings={venueBookings} />
          )}
          {isVenueManager && <VenuesSection name={name} />}
          {isOwnProfile && isVenueManager && (
            <button
              onClick={() => setCreateOpen(true)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Create Venue
            </button>
          )}
          <CreateVenueModal
            open={createOpen}
            onClose={() => setCreateOpen(false)}
            onCreate={(data) => {
              console.log("New venue:", data);
            }}
          />
        </div>
      </div>
    </div>
  );
}

function BookingsSection({ bookings }) {
  return (
    <section className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold border-b pb-2 mb-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              {booking.venue && (
                <p className="font-medium text-gray-800">
                  Venue: {booking.venue.name}
                </p>
              )}
              <p className="text-gray-700">
                From: {new Date(booking.dateFrom).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                To: {new Date(booking.dateTo).toLocaleDateString()}
              </p>
              <p className="text-gray-700">Guests: {booking.guests}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function ManagerBookingsSection({ bookings }) {
  return (
    <section className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
        Bookings for My Venues
      </h2>
      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings for your venues yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <p className="font-medium text-gray-800">
                Venue: {booking.venueName}
              </p>
              <p className="text-gray-700">
                From: {new Date(booking.dateFrom).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                To: {new Date(booking.dateTo).toLocaleDateString()}
              </p>
              <p className="text-gray-700">Guests: {booking.guests}</p>

              {booking.customer && (
                <div className="mt-2 text-gray-600 text-sm">
                  <p>
                    Customer:{" "}
                    <span className="font-medium">{booking.customer.name}</span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function VenueCard({ venue, onDelete, onUpdate }) {
  const { del, loading: deleting } = useDelete(`/holidaze/venues/${venue.id}`);
  const [isEditOpen, setIsEditOpen] = React.useState(false);

  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition">
      <Link to={`/venues/${venue.id}`}>
        <img
          src={venue.media?.[0]?.url}
          alt={venue.name}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
        <h3 className="text-lg font-semibold text-gray-900">{venue.name}</h3>
      </Link>
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => setIsEditOpen(true)}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={async () => {
            if (confirm(`Delete "${venue.name}"?`)) {
              await del();
              onDelete(venue.id);
            }
          }}
          disabled={deleting}
          className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
      <EditVenueModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        venue={venue}
        onUpdate={onUpdate}
      />
    </div>
  );
}

function VenuesSection({ name }) {
  const { response, loading, error } = useGet(
    `/holidaze/profiles/${name}/venues`
  );
  const [myVenues, setMyVenues] = React.useState([]);

  React.useEffect(() => {
    if (response?.data) setMyVenues(response.data);
  }, [response]);

  const handleDeleteVenue = (id) =>
    setMyVenues((prev) => prev.filter((v) => v.id !== id));
  const handleUpdateVenue = (updated) =>
    setMyVenues((prev) => prev.map((v) => (v.id === updated.id ? updated : v)));

  return (
    <section className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold border-b pb-2 mb-4">My Venues</h2>
      {loading && <p>Loading venues...</p>}
      {error && <p className="text-red-500">Error loading venues</p>}
      {myVenues.length === 0 ? (
        <p className="text-gray-500">No venues created yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {myVenues.map((venue) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              onDelete={handleDeleteVenue}
              onUpdate={handleUpdateVenue}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProfilePageInfo;
