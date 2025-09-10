import React, { useState } from "react";
import FilterBoxMin from "./FilterBoxMin";
import FilterBoxMax from "./FilterBoxMax";

function GuestInput({ minGuest, setMinGuest, maxGuest, setMaxGuest }) {
  const [error, setError] = React.useState("");

  const validateGuestRange = (min, max) => {
    if (min !== "" && max !== "" && parseFloat(min) > parseFloat(max)) {
      setError(
        "The minimum amount of guests has to be smaller than the maximum amount of guests"
      );
    } else {
      setError("");
    }
  };

  const handleMinChange = (e) => {
    const value = e.target.value;
    setMinGuest(value);
    validateGuestRange(value, maxGuest);
  };

  const handleMaxChange = (e) => {
    const value = e.target.value;
    setMaxGuest(value);
    validateGuestRange(minGuest, value);
  };

  return (
    <div className="flex gap-2">
      <FilterBoxMin value={minGuest} onChange={handleMinChange} />
      <FilterBoxMax value={maxGuest} onChange={handleMaxChange} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default GuestInput;
