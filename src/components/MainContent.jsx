import React, { useState } from "react";
import FilterBox from "./FilterBox";
import VenueList from "./VenueLists";

function MainContent() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex flex-row">
      <FilterBox mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 md:ml-64 p-4">
        <VenueList />
      </div>
    </div>
  );
}

export default MainContent;
