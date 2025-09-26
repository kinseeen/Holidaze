import React from "react";

function CustomButtonBig({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`bg-[#003366] hover:bg-[#004C99] text-white font-normal px-4 py-2 rounded-lg ${className}`}
    >
      {children}
    </button>
  );
}

export default CustomButtonBig;
