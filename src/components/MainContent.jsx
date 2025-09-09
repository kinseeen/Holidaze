// import React, { useState } from "react";
// import FilterBox from "./FilterBox";
// import VenueList from "./VenueLists";

// function MainContent() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");

//   return (
//     <div className="flex flex-row">
//       <FilterBox
//         mobileOpen={mobileOpen}
//         setMobileOpen={setMobileOpen}
//         search={search}
//         setSearch={setSearch}
//         minPrice={minPrice}
//         setMinPrice={setMinPrice}
//         maxPrice={maxPrice}
//         setMaxPrice={setMaxPrice}
//       />
//       <div className="flex-1 md:ml-64 p-4">
//         <VenueList search={search} minPrice={minPrice} maxPrice={maxPrice} />
//       </div>
//     </div>
//   );
// }

// export default MainContent;

import React, { useState } from "react";
import FilterBox from "./FilterBox";
import VenueList from "./VenueLists";

function MainContent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minGuest, setMinGuest] = useState("");
  const [maxGuest, setMaxGuest] = useState("");

  return (
    <div className="flex flex-row">
      <FilterBox
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        search={search}
        setSearch={setSearch}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        minGuest={minGuest}
        setMinGuest={setMinGuest}
        maxGuest={maxGuest}
        setMaxGuest={setMaxGuest}
      />
      <div className="flex-1 md:ml-64 p-4">
        <VenueList
          search={search}
          minPrice={minPrice}
          maxPrice={maxPrice}
          minGuest={minGuest}
          maxGuest={maxGuest}
        />
      </div>
    </div>
  );
}

export default MainContent;
