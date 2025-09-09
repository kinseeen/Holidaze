import React from "react";
import VenueBox from "./VenueBox";
import { useFetch } from "../hooks/useFetch";

function VenueList({ search, minPrice, maxPrice }) {
  const { data, loading, error } = useFetch("/venues");

  if (loading) return <p> Loading venues.. </p>;
  if (error) return <p className="text-red-500"> Error: {error}</p>;

  const query = search.toLowerCase();

  const min = minPrice ? parseFloat(minPrice) : -Infinity;
  const max = maxPrice ? parseFloat(maxPrice) : Infinity;

  const minGuests = minGuest ? parseInt(minGuest) : -Infinity;
const maxGuests = maxGuest ? parseInt(maxGuest) : Infinity;

  const venues = (data?.data || []).filter((venue) => {
    const nameMatch = venue.name.toLowerCase().includes(query);

    const price = venue.price ?? 0;
    const priceInRange = price >= min && price <= max;

    return nameMatch && priceInRange;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {venues.map((venue) => (
        <VenueBox
          key={venue.id}
          image={venue.media?.[0]?.url}
          name={venue.name}
          location={venue.location?.city}
          price={`$${venue.price}`}
          guestCapacity={venue.maxGuests}
        />
      ))}
    </div>
  );
}

export default VenueList;
