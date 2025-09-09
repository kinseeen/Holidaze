import React from "react";
import VenueBox from "./VenueBox";
import { useFetch } from "../hooks/useFetch";

function VenueList({ search, minPrice, maxPrice, minGuest, maxGuest }) {
  const { data, loading, error } = useFetch("/venues");

  if (loading) return <p> Loading venues.. </p>;
  if (error) return <p className="text-red-500"> Error: {error}</p>;

  const query = search.toLowerCase();

  const min = minPrice ? parseFloat(minPrice) : -Infinity;
  const max = maxPrice ? parseFloat(maxPrice) : Infinity;

  const minG = minGuest !== "" ? parseInt(minGuest, 10) : -Infinity;
  const maxG = maxGuest !== "" ? parseInt(maxGuest, 10) : Infinity;

  const venues = (data?.data || []).filter((venue) => {
    const nameMatch = venue.name?.toLowerCase().includes(search.toLowerCase());
    const locationMatch = venue.location?.city
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const price = venue.price ?? 0;
    const minP = minPrice !== "" ? parseFloat(minPrice) : -Infinity;
    const maxP = maxPrice !== "" ? parseFloat(maxPrice) : Infinity;
    const priceInRange = price >= minP && price <= maxP;

    const guest = venue.maxGuests ?? 0; // Use correct field from API
    const guestInRange = guest >= minG && guest <= maxG;

    return (nameMatch || locationMatch) && priceInRange && guestInRange;
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
