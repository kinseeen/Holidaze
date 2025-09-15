import React from "react";

function CustomButtonSmall({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#003366] hover:bg-[#004C99] text-white font-normal px-2 py-2 rounded-lg ${className}`"
    >
      {children}
    </button>
  );
}

export default CustomButtonSmall;
