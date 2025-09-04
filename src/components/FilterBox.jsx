import React from "react";
import SearchBar from "./SearchBarTest";
import PriceFilter from "./PriceFilter";
import GuestFilter from "./GuestFilter";
import FilterRating from "./FilterRating";
import CustomButtonBig from "./CustomButtonBig";
import CustomButtonSmall from "./CustomButtonSmall";

function FilterBox() {
  return (
    <div className="fixed h-screen gap-2 shadow-[5px_0px_10px_-5px_rgba(0,0,0,0.3)] p-2">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-normal border-b-2 border-primary pb-2">
          Search for venue
        </h1>
        <SearchBar />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-normal border-b-2 border-primary pb-2 pt-4 ">
          Filter
        </h1>
        <div className="">
          <PriceFilter />
        </div>
        <div className="">
          <GuestFilter />
        </div>
        <div className="">
          <FilterRating />
        </div>
        <CustomButtonBig onClick={() => console.log("Create venue")}>
          Create a venue
        </CustomButtonBig>
        <CustomButtonSmall onClick={() => console.log("Log in")}>
          Log in
        </CustomButtonSmall>
        <CustomButtonSmall onClick={() => console.log("Register")}>
          Register
        </CustomButtonSmall>
      </div>
    </div>
  );
}

export default FilterBox;
