import React, { useState } from "react";
import Logo from "../assets/logo.png";
import FilterBox from "./FilterBox";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="w-full sticky top-0 shadow-md z-50 bg-[#E6F0FA] h-16">
        <nav className="h-full flex items-center justify-center px-4 relative">
          {/* Logo centered */}
          <img src={Logo} alt="Logo" className="h-10 object-contain" />

          {/* Hamburger button on bottom-left (mobile only) */}
          <button
            className="md:hidden absolute bottom-0 left-4 text-[#003366] text-2xl bg-transparent p-2"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>
        </nav>
      </header>

      {/* Mobile FilterBox overlay */}
      {mobileOpen && (
        <FilterBox mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      )}
    </>
  );
}

export default Header;
