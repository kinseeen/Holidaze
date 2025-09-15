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
