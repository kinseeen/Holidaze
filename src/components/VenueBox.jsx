import React from "react";
import VenueRating from "./VenueRating";

function VenueBox({ image, name, location, price, guestCapacity, rating }) {
  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
      <div className="flex justify-center items-center bg-gray-100 h-40">
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>
      <div className="p-4 flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">Location: {location}</p>
        <p className="text-sm font-medium text-[#003366]">Price: {price}</p>
        <p className="text-sm font-medium text-[#003366]>">
          {" "}
          Guest capacity: {guestCapacity}
        </p>
        {rating > 0 && <VenueRating rating={rating} />}
      </div>
    </div>
  );
}

export default VenueBox;
