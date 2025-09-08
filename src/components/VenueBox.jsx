import React from "react";

function VenueBox({ image, name, location, price }) {
  return (
    <div className="w-64 bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
      <div className="flex justify-center items-center bg-gray-100 h-40">
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>
      <div className="p-4 flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">{location}</p>
        <p className="text-sm font-medium text-[#003366]">{price}</p>
      </div>
    </div>
  );
}

export default VenueBox;
