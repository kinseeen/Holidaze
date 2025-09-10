import React, { useState } from "react";
import FilterBoxMin from "./FilterBoxMin";
import FilterBoxMax from "./FilterBoxMax";

function PriceInput({ minPrice, setMinPrice, maxPrice, setMaxPrice }) {
  const [error, setError] = React.useState("");

  const validatePriceRange = (min, max) => {
    if (min !== "" && max !== "" && parseFloat(min) > parseFloat(max)) {
      setError("The minimum price has to be smaller than the maximum price");
    } else {
      setError("");
    }
  };

  const handleMinChange = (e) => {
    const value = e.target.value;
    setMinPrice(value);
    validatePriceRange(value, maxPrice);
  };

  const handleMaxChange = (e) => {
    const value = e.target.value;
    setMaxPrice(value);
    validatePriceRange(minPrice, value);
  };

  return (
    <div className="flex gap-2">
      <FilterBoxMin value={minPrice} onChange={handleMinChange} />
      <FilterBoxMax value={maxPrice} onChange={handleMaxChange} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default PriceInput;
