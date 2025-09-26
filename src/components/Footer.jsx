import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="w-full sticky bottom-0 shadow-md z-50 bg-[#E6F0FA] h-16">
      <div className="h-full flex items-center justify-center px-4 relative">
        <h2> This is a project for Kine Jakobsen</h2>
      </div>
    </footer>
  );
}

export default Footer;
