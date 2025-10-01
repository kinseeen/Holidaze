// import React, { useState } from "react";
// import VenueBox from "./VenueBox";
// import { useGet } from "../hooks/ApiCalls";
// import { Link } from "react-router-dom";

// function VenueList({
//   venues,
//   search,
//   // minPrice,
//   // maxPrice,
//   // minGuest,
//   // maxGuest,
//   // ratings,
// }) {
//   const query = search.toLowerCase();

//   const [currentPage, setCurrentPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);

//   const handleSearchChange = (event) => {
//     setSearchQuery;
//   };

//   // const min = minPrice ? parseFloat(minPrice) : -Infinity;
//   // const max = maxPrice ? parseFloat(maxPrice) : Infinity;

//   // const minG = minGuest !== "" ? parseInt(minGuest, 10) : -Infinity;
//   // const maxG = maxGuest !== "" ? parseInt(maxGuest, 10) : Infinity;

//   const filteredVenues = (venues || []).filter((venue) => {
//     const nameMatch = venue.name?.toLowerCase().includes(query);
//     const locationMatch = venue.location?.city?.toLowerCase().includes(query);

//     // const venueRating = Number(venue.rating) || 0;
//     // const ratingMatch =
//     //   ratings.length === 0 || ratings.includes(Math.floor(venueRating));

//     // const price = venue.price ?? 0;
//     // const minP = minPrice !== "" ? parseFloat(minPrice) : -Infinity;
//     // const maxP = maxPrice !== "" ? parseFloat(maxPrice) : Infinity;
//     // const priceInRange = price >= minP && price <= maxP;

//     // const guest = venue.maxGuests ?? 0;
//     // const guestInRange = guest >= minG && guest <= maxG;

//     return (
//       (nameMatch || locationMatch) &&
//       // priceInRange &&
//       // guestInRange &&
//       // ratingMatch
//     );
//   });

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {filteredVenues.map((venue) => (
//         <Link key={venue.id} to={`/venues/${venue.id}`}>
//           <VenueBox
//             key={venue.id}
//             image={venue.media?.[0]?.url}
//             name={venue.name}
//             location={venue.location?.city}
//             price={`$${venue.price}`}
//             guestCapacity={venue.maxGuests}
//             rating={venue.rating}
//           />
//         </Link>
//       ))}
//     </div>
//   );
// }

// export default VenueList;

import React from "react";
import VenueBox from "./VenueBox";
import { Link } from "react-router-dom";

function VenueList({ venues, search }) {
  const query = search?.toLowerCase() || "";

  const filteredVenues = (venues || []).filter((venue) => {
    const nameMatch = venue.name?.toLowerCase().includes(query) || false;
    const locationMatch =
      venue.location?.city?.toLowerCase().includes(query) || false;
    return nameMatch || locationMatch;
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
