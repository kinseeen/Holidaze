import React, { useState } from "react";
import Header from "./Header";
import FilterBox from "./FilterBox";
import { Outlet, useLocation } from "react-router-dom";

function MainLayout() {
  const location = useLocation();
  const isVenueDetail = /^\/venues\/\d+$/.test(location.pathname);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minGuest, setMinGuest] = useState("");
  const [maxGuest, setMaxGuest] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1">
        {!isVenueDetail && (
          <aside className="w-64 bg-gray-100 p-4">
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
          </aside>
        )}

        <main className={`flex-1 p-4 ${!isVenueDetail ? "md:ml-64" : ""}`}>
          <Outlet
            context={{
              search,
              minPrice,
              maxPrice,
              minGuest,
              maxGuest,
            }}
          />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
