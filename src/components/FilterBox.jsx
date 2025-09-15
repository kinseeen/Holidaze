import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButtonBig from "./CustomButtonBig";
import CustomButtonSmall from "./CustomButtonSmall";
import SearchBar from "./SearchBarTest";
import PriceFilter from "./PriceFilter";
import GuestFilter from "./GuestFilter";
import FilterRating from "./FilterRating";
import PriceInput from "./PriceInput";
import GuestInput from "./guestFilterInput";
import CreateVenueModal from "./CreateVenue";

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
  const navigate = useNavigate();
  const [createOpen, setCreateOpen] = React.useState(false);
  return (
    <>
      <div className="hidden md:flex fixed top-16 left-0 bottom-0 w-64 p-4 shadow-md flex-col">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-normal border-b-2 border-primary pb-2">
            Search for venue
          </h1>
          <SearchBar search={search} setSearch={setSearch} />
          <h1 className="text-xl font-normal border-b-2 border-primary pb-2 pt-4">
            Filter
          </h1>
          <PriceInput
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />

          <GuestInput
            minGuest={minGuest}
            setMinGuest={setMinGuest}
            maxGuest={maxGuest}
            setMaxGuest={setMaxGuest}
          />
          <FilterRating onChange={setRatings} />
        </div>

        <div className="flex flex-col gap-2 mt-auto">
          <CustomButtonBig onClick={() => setCreateOpen(true)}>
            Create a venue
          </CustomButtonBig>
          <div className="flex gap-2">
            <CustomButtonSmall onClick={() => navigate("/login")}>
              Log in
            </CustomButtonSmall>
            <CustomButtonSmall onClick={() => navigate("/login")}>
              Register
            </CustomButtonSmall>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="fixed top-1/2 left-1/2 z-50 p-4 flex flex-col 
                bg-white rounded-2xl shadow-lg 
                w-[90%] max-w-md h-[80%] 
                -translate-x-1/2 -translate-y-1/2"
        >
          <button
            className="self-end mb-4 p-2 bg-gray-200 rounded"
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button>

          <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
            <h1 className="text-xl font-normal border-b-2 border-primary pb-2">
              Search for venue
            </h1>
            <div>
              <SearchBar search={search} setSearch={setSearch} />
            </div>
            <h1 className="text-xl font-normal border-b-2 border-primary pb-2 pt-4">
              Filter
            </h1>
            <PriceInput
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
            <GuestInput
              minGuest={minGuest}
              setMinGuest={setMinGuest}
              maxGuest={maxGuest}
              setMaxGuest={setMaxGuest}
            />
            <FilterRating onChange={setRatings} />
          </div>

          <div className="flex flex-col gap-2 mt-auto">
            <CustomButtonBig onClick={() => setCreateOpen(true)}>
              Create a venue
            </CustomButtonBig>
            <div className="flex gap-2">
              <CustomButtonSmall onClick={() => navigate("/login")}>
                Log in
              </CustomButtonSmall>
              <CustomButtonSmall onClick={() => navigate("/login")}>
                Register
              </CustomButtonSmall>
            </div>
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
