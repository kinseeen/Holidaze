import React, { useState } from "react";
import VenueList from "./VenueLists";
import { useOutletContext, useLocation } from "react-router-dom";
import FilterBox from "./FilterBox";

function MainContent() {
  const location = useLocation();
  const isVenueDetail = /^\/venues\/\d+$/.test(location.pathname);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minGuest, setMinGuest] = useState("");
  const [maxGuest, setMaxGuest] = useState("");

  return (
    <div className="flex-1 p-4">
      {!isVenueDetail && (
        <aside className="w-64 bg-gray-100 p-4">
          <FilterBox
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            search={search}
            setSearch={setSearch}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            minGuest={minGuest}
            setMinGuest={setMinGuest}
            maxGuest={maxGuest}
            setMaxGuest={setMaxGuest}
          />
        </aside>
      )}
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
