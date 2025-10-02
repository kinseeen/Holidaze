import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === "") {
      onSearch("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <input
        type="search"
        placeholder="Search venues..."
        value={searchTerm}
        onChange={handleChange}
        className="flex-1 w-full px-3 py-2 text-xs sm:text-sm text-gray-700 placeholder-gray-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-blue-900 rounded-r-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
