import React from "react";
import FilterBoxMin from "./FilterBoxMin";
import FilterBoxMax from "./FilterBoxMax";

function GuestFilter() {
  return (
    <div className="">
      <h2 className="text-lg font-normal">Guest capacity</h2>
      <div className="flex items-center gap-2">
        <FilterBoxMin />
        <span>-</span>
        <FilterBoxMax />
      </div>
    </div>
  );
}

export default GuestFilter;
