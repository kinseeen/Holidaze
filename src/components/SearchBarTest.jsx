import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSearchClick = () => {
    onSearch(input);
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search venues..."
        className="flex-1 p-2 border rounded-lg"
      />
      <button
        onClick={handleSearchClick}
        className="px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
