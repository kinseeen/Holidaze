import React from "react";
import FilterBoxMin from "./FilterBoxMin";
import FilterBoxMax from "./FilterBoxMax";

function GuestFilter({ minGuest, setMinGuest, maxGuest, setMaxGuest }) {
  return (
    <div className="">
      <h2 className="text-lg font-normal">Guest capacity</h2>
      <div className="flex items-center gap-2">
        <FilterBoxMin value={minGuest} onChange={setMinGuest} />
        <span>-</span>
        <FilterBoxMax value={maxGuest} onChange={setMaxGuest} />
      </div>
    </div>
  );
}

export default GuestFilter;
