import React, { useState } from "react";
import CustomButtonBig from "./CustomButtonBig";
import CustomButtonSmall from "./CustomButtonSmall";
import SearchBar from "./SearchBarTest";
import PriceFilter from "./PriceFilter";
import GuestFilter from "./GuestFilter";
import FilterRating from "./FilterRating";
import PriceInput from "./PriceInput";
import GuestInput from "./guestFilterInput";

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
}) {
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
          <FilterRating />
        </div>

        <div className="flex flex-col gap-2 mt-auto">
          <CustomButtonBig onClick={() => console.log("Create venue")}>
            Create a venue
          </CustomButtonBig>
          <div className="flex gap-2">
            <CustomButtonSmall onClick={() => console.log("Log in")}>
              Log in
            </CustomButtonSmall>
            <CustomButtonSmall onClick={() => console.log("Register")}>
              Register
            </CustomButtonSmall>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 bg-white z-50 p-4 flex flex-col">
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
            <GuestFilter />
            <FilterRating />
          </div>

          <div className="flex flex-col gap-2 mt-auto">
            <CustomButtonBig onClick={() => console.log("Create venue")}>
              Create a venue
            </CustomButtonBig>
            <div className="flex gap-2">
              <CustomButtonSmall onClick={() => console.log("Log in")}>
                Log in
              </CustomButtonSmall>
              <CustomButtonSmall onClick={() => console.log("Register")}>
                Register
              </CustomButtonSmall>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FilterBox;
