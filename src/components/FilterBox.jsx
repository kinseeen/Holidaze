import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButtonBig from "./CustomButtonBig";
import CustomButtonSmall from "./CustomButtonSmall";
import PriceInput from "./PriceInput";
import GuestInput from "./guestFilterInput";
import FilterRating from "./FilterRating";
import CreateVenueModal from "./CreateVenue";
import { useAuth } from "../hooks/AuthProvider";

function FilterBox({
  mobileOpen,
  setMobileOpen,
  search,
  setSearch,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minGuest,
  setMinGuest,
  maxGuest,
  setMaxGuest,
  ratings,
  setRatings,
}) {
  const { user } = useAuth();
  const isVenueManager = Boolean(user?.venueManager);
  const navigate = useNavigate();
  const [createOpen, setCreateOpen] = useState(false);

  const [searchInput, setSearchInput] = useState(search);

  const handleSearch = () => {
    setSearch(searchInput.trim());
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

      <h1 className="text-xl font-normal border-b-2 border-primary pb-2 pt-4">
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
    </>
  );

  return (
    <>
      <div className="hidden md:flex fixed top-16 left-0 bottom-0 w-64 p-4 shadow-md flex-col">
        <div className="flex flex-col gap-2">{renderFilters()}</div>

        <div className="flex flex-col gap-2 mt-auto">
          {user ? (
            <>
              {isVenueManager && (
                <CustomButtonBig onClick={() => setCreateOpen(true)}>
                  Create Venue
                </CustomButtonBig>
              )}
              <CustomButtonBig
                onClick={() => navigate(`/profile/${user.name}`)}
              >
                Profile
              </CustomButtonBig>
            </>
          ) : (
            <>
              <CustomButtonSmall onClick={() => navigate("/login")}>
                Log in
              </CustomButtonSmall>
              <CustomButtonSmall onClick={() => navigate("/register")}>
                Register
              </CustomButtonSmall>
            </>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed top-1/2 left-1/2 z-50 p-4 flex flex-col bg-white rounded-2xl shadow-lg w-[90%] max-w-md h-[80%] -translate-x-1/2 -translate-y-1/2">
          <button
            className="self-end mb-4 p-2 bg-gray-200 rounded"
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button>

          <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
            {renderFilters()}
          </div>

          <div className="flex flex-col gap-2 mt-auto">
            {user ? (
              <>
                <CustomButtonBig
                  onClick={() => navigate(`/profile/${user.name}`)}
                >
                  Profile
                </CustomButtonBig>
                {isVenueManager && (
                  <CustomButtonBig onClick={() => setCreateOpen(true)}>
                    Create Venue
                  </CustomButtonBig>
                )}
              </>
            ) : (
              <>
                <CustomButtonSmall onClick={() => navigate("/login")}>
                  Log in
                </CustomButtonSmall>
                <CustomButtonSmall onClick={() => navigate("/register")}>
                  Register
                </CustomButtonSmall>
              </>
            )}
          </div>
        </div>
      )}

      <CreateVenueModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={(data) => console.log("New venue:", data)}
      />
    </>
  );
}

export default FilterBox;
