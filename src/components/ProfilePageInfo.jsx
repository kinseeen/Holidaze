import { useParams } from "react-router-dom";
import React from "react";
import { useGet } from "../hooks/ApiCalls";

function ProfilePageInfo({}) {
  const { name } = useParams();

  const { response, loading, error } = useGet(
    `/holidaze/profiles/${name}?bookings=true`
  );

  if (loading) return <p> Loading profile </p>;
  if (error) return <p className="text-red-500"> Error: {error}</p>;

  const profile = response.data;

  const isVenueManager = response.data.venueManager;
  console.log("I am a venumanager? ->" + isVenueManager);

  if (!profile) return <p> Profile not found </p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/*  <BackButton className="mb-4" /> */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
      </div>
      <h3> {profile.email}</h3>

      <img
        src={profile.avatar?.url}
        alt={profile.name}
        className="w-full max-w-md rounded-xl shadow-lg mt-2"
      />

      <h3>Nr of bookings: {profile._count.bookings}</h3>

      <div className="mt-8">
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-1 mb-3">
          {}
        </h2>
        <p className="text-gray-700">{profile.bio}</p>
      </div>
      <hr className="my-8 border-gray-300" />
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 "></div>
    </div>
  );
}

export default ProfilePageInfo;
