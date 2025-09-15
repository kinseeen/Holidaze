import React, { useState } from "react";
import { Star, StarBorder } from "@mui/icons-material";

function FilterRating({ onChange }) {
  const levels = [1, 2, 3, 4, 5];
  const [checkedLevels, setCheckedLevels] = useState([]);

  const toggleLevel = (level) => {
    setCheckedLevels((prev) => {
      const updated = prev.includes(level)
        ? prev.filter((l) => l !== level)
        : [...prev, level];

      onChange?.(updated); // ✅ send selected ratings to parent
      return updated;
    });
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-normal pb-2">Rating</h3>
      <div className="flex flex-col gap-2">
        {levels.map((level) => (
          <label key={level} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 accent-black"
              checked={checkedLevels.includes(level)}
              onChange={() => toggleLevel(level)}
            />
            <div className="flex">
              {Array.from({ length: level }).map((_, i) =>
                checkedLevels.includes(level) ? (
                  <Star key={i} fontSize="small" className="text-500" />
                ) : (
                  <StarBorder
                    key={i}
                    fontSize="small"
                    className="text-gray-400"
                  />
                )
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default FilterRating;
