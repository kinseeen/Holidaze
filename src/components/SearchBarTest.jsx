// import React from "react";

// function SearchBar() {
//   return (
//     <input
//       type="text"
//       placeholder="i.e Spanish hotel"
//       className="w-full h-10 rounded-lg border border-primary shadow-md pl-4 pr-2 py-1 placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-md"
//       style={{ textIndent: "10px" }}
//     />
//   );
// }

// export default SearchBar;

import React from "react";

function SearchBar({ search, setSearch }) {
  const filterChange = (e) => setSearch(e.target.value);

  return (
    <input
      type="text"
      placeholder="i.e Spanish hotel"
      className="w-full h-10 rounded-lg border border-primary shadow-md pl-4 pr-2 py-1 placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-md"
      style={{ textIndent: "10px" }}
      value={search}
      onChange={filterChange}
    />
  );
}

export default SearchBar;
