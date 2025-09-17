import React, { useState, useEffect } from "react";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSearchResults = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/venues/search?q=${query}`
      );
      const text = await response.text();
      console.log(text);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      fetchSearchResults(value);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search venues..."
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {searchResult.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;

// function SearchBar({ search, setSearch }) {
//   const filterChange = (e) => setSearch(e.target.value);

//   return (
//     <input
//       type="text"
//       placeholder="i.e Spanish hotel"
//       className="w-full h-10 rounded-lg border border-primary shadow-md pl-4 pr-2 py-1 placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-md"
//       style={{ textIndent: "10px" }}
//       value={search}
//       onChange={filterChange}
//     />
//   );
// }

// export default SearchBar;
