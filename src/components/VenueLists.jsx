import React from "react";
import VenueBox from "./VenueBox";
import { useFetch } from "../hooks/useFetch";

function VenueList() {
  const { data, loading, error } = useFetch("/venues");

  if (loading) return <p> Loading venues.. </p>;
  if (error) return <p className="text-red-500"> Error: {error}</p>;

  const venues = data?.data || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {venues.map((venue) => (
        <VenueBox
          key={venue.id}
          image={venue.media?.[0]?.url}
          name={venue.name}
          location={venue.location?.city}
          price={`$${venue.price}`}
        />
      ))}
    </div>
  );
}

export default VenueList;
