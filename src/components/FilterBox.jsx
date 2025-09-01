import React from "react";
import SearchBar from "../components/SearchBarTest";

function FilterBox() {
  return (
    <div className="flex flex-col items-start border-r-2 border-gray-300 pr-4">
      <div className="Searchbar">
        <h1> Search</h1>
        <SearchBar />
      </div>
    </div>
  );
}

export default FilterBox;
