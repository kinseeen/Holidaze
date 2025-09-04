import React from "react";
import FilterBoxMin from "./FilterBoxMin";
import FilterBoxMax from "./FilterBoxMax";

function PriceFilter() {
  return (
    <div className="flex flex-col gap-2 ">
      <h2 className="text-lg font-normal">Price</h2>
      <div className="flex items-center gap-2">
        <FilterBoxMin />
        <span>-</span>
        <FilterBoxMax />
      </div>
    </div>
  );
}

export default PriceFilter;
