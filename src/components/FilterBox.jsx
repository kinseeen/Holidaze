import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButtonBig from "./CustomButtonBig";
import CustomButtonSmall from "./CustomButtonSmall";
import SearchBar from "./SearchBarTest";
import PriceInput from "./PriceInput";
import GuestInput from "./guestFilterInput";
import FilterRating from "./FilterRating";
import CreateVenueModal from "./CreateVenue";
import { useAuth } from "../hooks/AuthProvider";

function FilterBox({
  mobileOpen,
  setMobileOpen,
  search,
  setSearch,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minGuest,
  setMinGuest,
  maxGuest,
  setMaxGuest,
  ratings,
  setRatings,
}) {
  const { user } = useAuth();
  const isVenueManager = Boolean(user?.venueManager);
  const navigate = useNavigate();
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <>
      <div className="hidden md:flex fixed top-16 left-0 bottom-0 w-64 p-4 shadow-md flex-col">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-normal border-b-2 border-primary pb-2">
            Search for venue
          </h1>
          <SearchBar search={search} setSearch={setSearch} />
          <h1 className="text-xl font-normal border-b-2 border-primary pb-2 pt-4">
            Filter
          </h1>
          <h2 className="text-l font-normal border-b-2 border-primary pb-2 pt-4">
            Price{" "}
          </h2>
          <PriceInput
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
          <h2 className="text-l font-normal border-b-2 border-primary pb-2 pt-4">
            {" "}
            Guests{" "}
          </h2>
          <GuestInput
            minGuest={minGuest}
            setMinGuest={setMinGuest}
            maxGuest={maxGuest}
            setMaxGuest={setMaxGuest}
          />
          <h1 className="border-b-2 border-primary pb-2 pt-4"></h1>
          <FilterRating onChange={setRatings} />
        </div>

        <div className="flex flex-col gap-2 mt-auto">
          {user ? (
            <>
              {isVenueManager && (
                <CustomButtonBig onClick={() => setCreateOpen(true)}>
                  Create Venue
                </CustomButtonBig>
              )}
              <CustomButtonBig
                onClick={() => navigate(`/profile/${user.name}`)}
              >
                Profile
              </CustomButtonBig>
            </>
          ) : (
            <>
              <CustomButtonSmall onClick={() => navigate("/login")}>
                Log in
              </CustomButtonSmall>
              <CustomButtonSmall onClick={() => navigate("/register")}>
                Register
              </CustomButtonSmall>
            </>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed top-1/2 left-1/2 z-50 p-4 flex flex-col bg-white rounded-2xl shadow-lg w-[90%] max-w-md h-[80%] -translate-x-1/2 -translate-y-1/2">
          <button
            className="self-end mb-4 p-2 bg-gray-200 rounded"
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button>

          <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
            <h1 className="text-xl font-normal border-b-2 border-primary pb-2">
              Search for venue
            </h1>
            <SearchBar search={search} setSearch={setSearch} />
            <h1 className="text-xl font-normal border-b-2 border-primary pb-2 pt-4">
              Filter
            </h1>
            <PriceInput
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
            <GuestInput
              minGuest={minGuest}
              setMinGuest={setMinGuest}
              maxGuest={maxGuest}
              setMaxGuest={setMaxGuest}
            />
            <FilterRating onChange={setRatings} />
          </div>

          <div className="flex flex-col gap-2 mt-auto">
            {user ? (
              <>
                <CustomButtonBig
                  onClick={() => navigate(`/profile/${user.name}`)}
                >
                  Profile
                </CustomButtonBig>
                {isVenueManager && (
                  <CustomButtonBig onClick={() => setCreateOpen(true)}>
                    Create Venue
                  </CustomButtonBig>
                )}
              </>
            ) : (
              <>
                <CustomButtonSmall onClick={() => navigate("/login")}>
                  Log in
                </CustomButtonSmall>
                <CustomButtonSmall onClick={() => navigate("/register")}>
                  Register
                </CustomButtonSmall>
              </>
            )}
          </div>
        </div>
      )}

      {/* Create Venue Modal */}
      <CreateVenueModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={(data) => console.log("New venue:", data)}
      />
    </>
  );
}

export default FilterBox;
