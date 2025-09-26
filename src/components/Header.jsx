import React, { useState } from "react";
import Logo from "../assets/logo.png";
import FilterBox from "./FilterBox";
import { Link } from "react-router-dom";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="w-full sticky top-0 shadow-md z-50 bg-[#E6F0FA] h-16">
        <nav className="h-full flex items-center justify-center px-4 relative">
          <Link to="/" className="flex justify-center items-center">
            <img src={Logo} alt="Logo" className="h-20 object-contain" />
          </Link>
          <button
            className="md:hidden absolute bottom-2 left-4 text-[#003366] text-2xl bg-transparent p-2"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>
        </nav>
      </header>
      {mobileOpen && (
        <FilterBox mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      )}
      {/* <FilterBox mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} /> */}
    </>
  );
}

export default Header;
