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
      {/* <div className="grid grid-cols-3"> */}
        {/* <div>
          <button onClick={toggleFilter}>
            {filterVisible ? "Hide Filter" : "Show Filter"}
          </button>
          {filterVisible && <FilterSection />}
        </div> */}
        <div className="col-span-2">
          {isLoading ? (
            <SkeletonSearchCard />
          ) : (
            <>
              <SearchCard searchQuery={searchQuery} />
            </>
          )}
        </div>
      </div>
    // </div>
  );
};

export default SearchPageBody;
