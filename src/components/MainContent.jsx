import React from "react";
import VenueList from "./VenueLists";
import { useOutletContext } from "react-router-dom";

function MainContent() {
  const { search, minPrice, maxPrice, minGuest, maxGuest } = useOutletContext();

  return (
    <div className="flex-1 p-4">
      <VenueList
        search={search}
        minPrice={minPrice}
        maxPrice={maxPrice}
        minGuest={minGuest}
        maxGuest={maxGuest}
      />
    </div>
  );
}

export default MainContent;
