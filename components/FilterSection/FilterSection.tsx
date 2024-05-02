import React, { useState } from "react";
import "tailwindcss/tailwind.css";

interface Filters {
  [key: string]: boolean;
}

const FilterSection = () => {
  const initialFilters: Filters = {
    filter1: false,
    filter2: false,
    filter3: false,
    // Add more filters as needed
  };

  const [filters, setFilters] = useState(initialFilters);

  const filterNames = Object.keys(initialFilters);

  const handleCheckboxChange = (filterName: string) => {
    setFilters({
      ...filters,
      [filterName]: !filters[filterName],
    });
  };

  return (
    <div className="py-4 px-6 border-b border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Cities</h2>
      <div className="flex flex-col space-y-2">
        {filterNames.map((filterName) => (
          <label key={filterName} className="flex items-center">
            <input
              type="checkbox"
              checked={filters[filterName]}
              onChange={() => handleCheckboxChange(filterName)}
              className="mr-2"
            />
            {filterName}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
