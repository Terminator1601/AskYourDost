// PopularSearches.jsx

import React from "react";
import Cards from "../PopularSearches/Cards";
import { popularSectionData } from "@/app/MainData";
const PopularSearches = () => {
  return (
    <>
      <div>Popular Searches</div>
      <div className="grid grid-cols-6 text-center">
        {popularSectionData.map((item, index) => (
          <a href="/" key={index}>
            <div className="px-3">
              <Cards
                title={item.title}
                imageUrl={item.imageUrl}
                description={item.description}
              />
            </div>
          </a>
        ))}
      </div>
    </>
  );
};

export default PopularSearches;
