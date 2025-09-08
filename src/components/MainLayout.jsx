import React from "react";
import FilterBox from "./FilterBox";
import Header from "./Header";
import VenueBox from "./VenueBox";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <VenueBox />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
