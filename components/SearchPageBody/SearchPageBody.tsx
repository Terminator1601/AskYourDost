// import React, { useEffect, useState } from "react";
// import FilterSection from "../FilterSection/FilterSection";
// import SearchCard from "../Cards/SearchCard";
// import SkeletonSearchCard from "../Loader/SkeletonSearchCard";

// const SearchPageBody = () => {
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [filterVisible, setFilterVisible] = useState<boolean>(false);

//   useEffect(() => {
//     const queryFromUrl = new URLSearchParams(window.location.search).get(
//       "query"
//     );
//     setSearchQuery(queryFromUrl || "");

//     const fakeLoadingTimeout = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);

//     return () => clearTimeout(fakeLoadingTimeout);
//   }, []);

//   const toggleFilter = () => {
//     setFilterVisible(!filterVisible);
//   };

//   return (
//     <div>
//       {/* <div className="grid grid-cols-3"> */}
//         {/* <div>
//           <button onClick={toggleFilter}>
//             {filterVisible ? "Hide Filter" : "Show Filter"}
//           </button>
//           {filterVisible && <FilterSection />}
//         </div> */}
//         <div className="col-span-2">
//           {isLoading ? (
//             <SkeletonSearchCard />
//           ) : (
//             <>
//               <SearchCard searchQuery={searchQuery} />
//             </>
//           )}
//         </div>
//       </div>
//     // </div>
//   );
// };

// export default SearchPageBody;





import React, { useEffect, useState } from "react";
import FilterSection from "../FilterSection/FilterSection";
import { useRouter } from "next/router";

import SearchCard from "../Cards/SearchCard";
import SkeletonSearchCard from "../Loader/SkeletonSearchCard";

const SearchPageBody = () => {
  const router = useRouter();
  const { category } = router.query;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);

  useEffect(() => {
    const fakeLoadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(fakeLoadingTimeout);
  }, []);

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  const getCategoryString = (category: string | string[] | undefined): string => {
    if (typeof category === "string") {
      return category;
    } else if (Array.isArray(category)) {
      return category.join(", "); // or handle as you see fit
    } else {
      return ""; // or handle as you see fit
    }
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
            <SearchCard searchQuery={getCategoryString(category)} />
          </>
        )}
      </div>
    </div>
    // </div>
  );
};

export default SearchPageBody;
