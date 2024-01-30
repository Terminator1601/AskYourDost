import React, { useEffect, useState } from "react";
import FilterSection from "../FilterSection/FilterSection";
import SearchCard from "../Cards/SearchCard";
import SkeletonSearchCard from "../Loader/SkeletonSearchCard";

const SearchPageBody = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);

  useEffect(() => {
    const queryFromUrl = new URLSearchParams(window.location.search).get(
      "query"
    );
    setSearchQuery(queryFromUrl || "");

    const fakeLoadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(fakeLoadingTimeout);
  }, []);

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <div>
      <div className="grid grid-cols-3">
        <div>
          <button onClick={toggleFilter}>
            {filterVisible ? "Hide Filter" : "Show Filter"}
          </button>
          {filterVisible && <FilterSection />}
        </div>
        <div className="col-span-2">
          <h2>This is two divs </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            earum repellendus beatae itaque sit atque quod, maxime, soluta
            ratione minus autem libero nobis commodi ut odit fugiat, eos
            accusantium architecto!
          </p>

          {isLoading ? (
            <SkeletonSearchCard />
          ) : (
            <>
              <SearchCard searchQuery={searchQuery} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPageBody;
