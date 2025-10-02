import React from "react";
import VenueBox from "./VenueBox";
import { Link } from "react-router-dom";

function VenueList({ venues, search }) {
  const query = search?.toLowerCase() || "";

  const filteredVenues = (venues || []).filter((venue) => {
    const name = (venue.name || "").toLowerCase().trim();
    const description = (venue.description || "").toLowerCase().trim();

    return name.includes(query) || description.includes(query);
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredVenues.map((venue) => (
        <Link key={venue.id} to={`/venues/${venue.id}`}>
          <VenueBox
            image={venue.media?.[0]?.url}
            name={venue.name}
            location={venue.location?.city}
            price={`$${venue.price}`}
            guestCapacity={venue.maxGuests}
            rating={venue.rating}
          />
        </Link>
      ))}
    </div>
  );
}

export default VenueList;
