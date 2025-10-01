import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButtonBig from "./CustomButtonBig";
import CustomButtonSmall from "./CustomButtonSmall";
// import PriceInput from "./PriceInput";
// import GuestInput from "./guestFilterInput";
// import FilterRating from "./FilterRating";
import CreateVenueModal from "./CreateVenue";
import { useAuth } from "../hooks/AuthProvider";

function FilterBox({
  mobileOpen,
  setMobileOpen,
  search,
  setSearch,
  // minPrice,
  // setMinPrice,
  // maxPrice,
  // setMaxPrice,
  // minGuest,
  // setMinGuest,
  // maxGuest,
  // setMaxGuest,
  // ratings,
  // setRatings,
}) {
  const { user } = useAuth();
  const isVenueManager = Boolean(user?.venueManager);
  const navigate = useNavigate();
  const [createOpen, setCreateOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchInput, setSearchInput] = useState(search);

  const handleSearch = () => {
    setSearch(searchInput.trim());
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);

    if (e.target.value === "") {
      setSearch("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const renderFilters = () => (
    <>
      <div className="mb-4">
        <h1 className="text-xl font-normal border-b-2 border-primary pb-2">
          Search for venue
        </h1>
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Search venues..."
          className="w-full p-2 border rounded-lg"
        />
        <CustomButtonBig onClick={handleSearch} className="w-full mt-2">
          Search
        </CustomButtonBig>
      </div>

      {/* <h1 className="text-xl font-normal border-b-2 border-primary pb-2 pt-4">
        Filter
      </h1>
      <h2 className="text-l font-normal border-b-2 border-primary pb-2 pt-4">
        Price
      </h2>
      <PriceInput
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />
      <h2 className="text-l font-normal border-b-2 border-primary pb-2 pt-4">
        Guests
      </h2>
      <GuestInput
        minGuest={minGuest}
        setMinGuest={setMinGuest}
        maxGuest={maxGuest}
        setMaxGuest={setMaxGuest}
      />
      <FilterRating onChange={setRatings} />
    </> */}
  );

  return (
    <>
      <CreateVenueModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={(data) => console.log("New venue:", data)}
      />
    </>
  );
}

export default FilterBox;
