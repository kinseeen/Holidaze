// import React, { useState } from "react";
// import Logo from "../assets/logo.png";
// import { Link, useNavigate } from "react-router-dom";
// import { Face } from "@mui/icons-material";

// function Header({ setSearch }) {
//   const [searchInput, setSearchInput] = useState("");
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setSearch(searchInput);
//     navigate("/");
//   };

//   return (
//     <>
//       <header className="w-full sticky top-0 shadow-md z-50 bg-[#E6F0FA] h-16">
//         <nav className="h-full flex items-center justify-between px-4 relative">
//           {/* Logo */}
//           <Link to="/" className="flex justify-center items-center">
//             <img src={Logo} alt="Logo" className="h-20 object-contain" />
//           </Link>

//           <form onSubmit={handleSearch} className="flex items-center space-x-2">
//             <input
//               type="text"
//               placeholder="Search venues..."
//               value={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//               className="px-3 py-2 border rounded"
//             />
//             <button
//               type="submit"
//               className="px-3 py-2 bg-blue-500 text-white rounded"
//             >
//               Search
//             </button>
//           </form>

//           <button
//             onClick={() => navigate("/login")}
//             className="ml-4 p-2 rounded-full hover:bg-gray-200"
//             title="Login/Register"
//           >
//             <Face />
//           </button>
//         </nav>
//       </header>
//     </>
//   );
// }

// export default Header;

import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Face, Search as SearchIcon } from "@mui/icons-material";
import { useAuth } from "../hooks/AuthProvider";
import CreateVenueModal from "./CreateVenue";
import SearchBar from "./SearchBar";

function Header({ setSearch }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    navigate("/");
  };

  const handleProfileClick = () => {
    if (user) {
      navigate(`/profile/${user.name}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <header className="w-full sticky top-0 shadow-md z-50 bg-[#E6F0FA] h-16">
        <nav className="h-full flex items-center justify-between px-4 relative">
          <Link to="/" className="flex justify-center items-center">
            <img src={Logo} alt="Logo" className="h-20 object-contain" />
          </Link>
          <div className="flex-1 min-w-0 flex justify-center">
            <SearchBar onSearch={setSearch} />
          </div>
          <button
            onClick={handleProfileClick}
            className="ml-2 p-2 rounded-full hover:bg-gray-200 flex-shrink-0"
            title={user ? "Go to Profile" : "Login/Register"}
          >
            <Face />
          </button>
        </nav>
      </header>
    </>
  );
}

export default Header;
