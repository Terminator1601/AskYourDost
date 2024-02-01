import React, { useState, useEffect } from "react";
import PopularSearchCard from "../Cards/PopularSearchCard";
import { popularSectionData } from "../../app/MainData";
import "tailwindcss/tailwind.css";
import SkeletonCard from "../Loader/SkeletonCard";

const PopularSearches = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetching delay
    const fetchData = () => {
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Set the delay time as needed
    };

    fetchData();
  }, []);

  return (
    <div className="pb-10">
      <div className="text-lg font-bold py-8 pl-5">Popular Searches</div>
      {loading ? (
        <SkeletonCard />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 text-center">
          {popularSectionData.map((item, index) => (
            <a
              href={`/SearchResults?query=${encodeURIComponent(
                item.title || ""
              )}`}
              key={index}
            >
              <div className="px-3 text-center ">
                <PopularSearchCard
                  title={item.title}
                  imageUrl={item.imageUrl}
                  // description={item.description}
                />
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularSearches;
