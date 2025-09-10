import { useParams } from "react-router-dom";
import React from "react";
import { useFetch } from "../hooks/useFetch";
import VenueRating from "../components/venueRaing";
import {
  AttachMoney,
  Diversity3,
  Wifi2Bar,
  DirectionsCar,
  BakeryDining,
  Pets,
  Apartment,
  PinDrop,
} from "@mui/icons-material";
import BackButton from "../components/BackButton";

function VenuePage({ image, name, location, price, guestCapacity }) {
  const { id } = useParams();

  const { data, loading, error } = useFetch("/venues");

  if (loading) return <p> Loading venue </p>;
  if (error) return <p className="text-red-500"> Error: {error} </p>;

  const venue = (data?.data || []).find((v) => String(v.id) === id);

  if (!venue) return <p>Venue not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <BackButton className="mb-4" />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-900">{venue.name}</h1>
        <VenueRating rating={venue.rating} />
      </div>

      <img
        src={venue.media?.[0]?.url}
        alt={venue.name}
        className="w-full max-w-md rounded-xl shadow-lg mt-2"
      />

      <div className="mt-8">
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-1 mb-3">
          About
        </h2>
        <p className="text-gray-700">{venue.description}</p>
      </div>
      <hr className="my-8 border-gray-300" />
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        {venue.price && (
          <div className="flex items-center gap-2">
            <AttachMoney className="text-green-600" /> ${venue.price} per night
          </div>
        )}
        {venue.maxGuests && (
          <div className="flex items-center gap-2">
            <Diversity3 className="text-blue-600" /> {venue.maxGuests} max
            guests
          </div>
        )}
        {venue.meta?.wifi && (
          <div className="flex items-center gap-2">
            <Wifi2Bar className="text-purple-600" /> Free Wifi
          </div>
        )}
        {venue.meta?.breakfast && (
          <div className="flex items-center gap-2">
            <BakeryDining className="text-orange-600" /> Breakfast included
          </div>
        )}
        {venue.meta?.pets && (
          <div className="flex items-center gap-2">
            <Pets className="text-pink-600" /> Pets allowed
          </div>
        )}
        {venue.meta?.parking && (
          <div className="flex items-center gap-2">
            <DirectionsCar className="text-gray-600" /> Parking available
          </div>
        )}
      </div>

      <hr className="my-8 border-gray-300" />

      {/* Location */}
      <div className="flex flex-wrap gap-6 text-gray-700">
        {venue.location?.address && (
          <div className="flex items-center gap-2">
            <Apartment /> {venue.location.address}
          </div>
        )}
        {venue.location?.country && (
          <div className="flex items-center gap-2">
            <PinDrop /> {venue.location.country}
          </div>
        )}
      </div>
    </div>
  );
}

export default VenuePage;
