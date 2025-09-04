import React from "react";

function FilterBoxMin() {
  return (
    <div className="flex flex-col">
      <h3 className="mb-1 text-gray-700 font-normal">Minimum</h3>
      <input
        type="text"
        placeholder=""
        className="w-20 h-8 rounded-lg border border-primary shadow-md pl-4 pr-2 py-1 placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
        style={{ textIndent: "10px" }}
      />
    </div>
  );
}

export default FilterBoxMin;
