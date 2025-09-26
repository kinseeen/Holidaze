import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
// import Footer from "./Footer";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default MainLayout;
