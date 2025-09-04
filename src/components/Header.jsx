import React from "react";
import Logo from "../assets/logo.png";

function Header() {
  return (
    <header className="sticky top-0 shadow-md z-50 bg-primary h-[200px]">
      <nav className="h-full flex items-center px-12">
        <img src={Logo} alt="Logo" className="h-5/6" />
      </nav>
    </header>
  );
}

export default Header;
