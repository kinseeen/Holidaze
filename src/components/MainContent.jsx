import React from "react";
import FilterBox from "./FilterBox";
import VenueBox from "./VenueBox";

function MainContent() {
  return (
    <div className="flex flex-row">
      <div className="w-64 h-screen sticky top-0">
        <FilterBox />
      </div>
      <div className=" ">{/* <VenueBox /> */}</div>
    </div>
  );
}

export default MainContent;
