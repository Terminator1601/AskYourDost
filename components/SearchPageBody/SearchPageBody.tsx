import React, { useEffect, useState } from "react";
import FilterSection from "../FilterSection/FilterSection";
import SearchCard from "../Cards/SearchCard";

const SearchPageBody = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const queryFromUrl = new URLSearchParams(window.location.search).get(
      "query"
    );
    setSearchQuery(queryFromUrl || ""); // Use the queryFromUrl or an empty string if it's null
  }, []);

  return (
    <div>
      <div className="grid grid-cols-3">
        <div>
          <FilterSection />
        </div>
        <div className="col-span-2">
          <h2>This is two divs </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            earum repellendus beatae itaque sit atque quod, maxime, soluta
            ratione minus autem libero nobis commodi ut odit fugiat, eos
            accusantium architecto!
          </p>
          <SearchCard searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
};

export default SearchPageBody;
