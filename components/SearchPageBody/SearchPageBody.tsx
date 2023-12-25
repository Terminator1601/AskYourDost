import React from "react";
import FilterSection from "../FilterSection/FilterSection";
import SearchCard from "../Cards/SearchCard";

const SearchPageBody = () => {
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
          <SearchCard />
        </div>
      </div>
    </div>
  );
};

export default SearchPageBody;
