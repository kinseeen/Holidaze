import React, { useState } from "react";
import VenueList from "./VenueLists";
import { useOutletContext, useLocation } from "react-router-dom";
import FilterBox from "./FilterBox";
import CreateVenueModal from "./CreateVenue";
import { useAuth } from "../hooks/AuthProvider";

function MainContent() {
  const location = useLocation();
  const isVenueDetail = /^\/venues\/\d+$/.test(location.pathname);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minGuest, setMinGuest] = useState("");
  const [maxGuest, setMaxGuest] = useState("");
  const [ratings, setRatings] = useState([]);
  const [venues, setVenues] = [];
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuth;

  const handleAddVenue = (venue) => {
    setVenues((prev) => [...prev, venue]);
  };

  return (
    <div className="flex flex-row min-h-screen">
      <aside className="w-64 hidden md:block">
        {!isVenueDetail && (
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
            ratings={ratings}
            setRatings={setRatings}
          />
        )}
      </aside>
      <div className="flex-1">
        <VenueList
          venues={venues}
          search={search}
          minPrice={minPrice}
          maxPrice={maxPrice}
          minGuest={minGuest}
          maxGuest={maxGuest}
          ratings={ratings}
        />
      </div>
      <CreateVenueModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleAddVenue} // 👈 add new venue to state
      />
    </div>
  );
}

export default MainContent;
