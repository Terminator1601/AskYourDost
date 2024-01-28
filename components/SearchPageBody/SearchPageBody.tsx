import React, { useEffect, useState } from "react";
import FilterSection from "../FilterSection/FilterSection";
import SearchCard from "../Cards/SearchCard";
import SkeletonSearchCard from "../Loader/SkeletonSearchCard"; // Import your Loader component

const SearchPageBody = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const queryFromUrl = new URLSearchParams(window.location.search).get(
      "query"
    );
    setSearchQuery(queryFromUrl || "");

    // Simulate loading time (you can replace this with your actual data fetching logic)
    const fakeLoadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Cleanup timeout to avoid memory leaks
    return () => clearTimeout(fakeLoadingTimeout);
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

          {isLoading ? (
            <SkeletonSearchCard /> // Show loader component while loading
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
