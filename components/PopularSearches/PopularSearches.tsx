import React from "react";
import Cards from "../Cards/HomepageCards";
import { popularSectionData } from "../../app/MainData";
import "tailwindcss/tailwind.css";
const PopularSearches = () => {
  return (
    <div className="py-5">
      <div className="text-lg font-bold pb-5">Popular Searches</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 text-center">
        {popularSectionData.map((item, index) => (
          <a
            href={`/SearchResults?query=${encodeURIComponent(item.title || "")}`}
            key={index}
          >
            <div className="px-3 text-center">
              <Cards
                title={item.title}
                imageUrl={item.imageUrl}
                description={item.description}
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PopularSearches;
