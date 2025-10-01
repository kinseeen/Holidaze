import React, { useState, useEffect } from "react";
import VenueList from "./VenueLists";
import { useLocation, useOutletContext } from "react-router-dom";
import CreateVenueModal from "./CreateVenue";
import { useAuth } from "../hooks/AuthProvider";
import { useGet } from "../hooks/ApiCalls";

function MainContent() {
  const location = useLocation();
  const isVenueDetail = /^\/venues\/\d+$/.test(location.pathname);

  const [mobileOpen, setMobileOpen] = useState(false);
  const { search, setSearch } = useOutletContext();
  // const [minPrice, setMinPrice] = useState("");
  // const [maxPrice, setMaxPrice] = useState("");
  // const [minGuest, setMinGuest] = useState("");
  // const [maxGuest, setMaxGuest] = useState("");
  // const [ratings, setRatings] = useState([]);
  // const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const endpoint = search
    ? `/holidaze/venues/search?q=${search}`
    : `/holidaze/venues?limit=${limit}&page=${page}`;

  const { response, loading, error } = useGet(endpoint);
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    if (response?.data) {
      setVenues(response.data || response);
    }
  }, [response]);

  const handleAddVenue = (venue) => {
    setVenues((prev) => [...prev, venue]);
  };

  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex-1 flex flex-col">
        {loading && <p className="text-center">Loading...</p>}
        {error && (
          <p className="text-center text-red-500">Error loading venues</p>
        )}
        {!loading && !error && (
          <VenueList
            venues={venues}
            search={search}
            // minPrice={minPrice}
            // maxPrice={maxPrice}
            // minGuest={minGuest}
            // maxGuest={maxGuest}
            // ratings={ratings}
          />
        )}

        {!search && (
          <div className="flex justify-center space-x-4 p-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainContent;
