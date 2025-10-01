import React, { useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      <Header setSearch={setSearch} />
      <main className="flex-1 p-4">
        <Outlet context={{ search, setSearch }} />
      </main>
    </div>
  );
}

export default MainLayout;