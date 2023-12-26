// PopularSearches.jsx

import React from "react";
import ServicesCard from "./ServicesCard";
import { ServicesData } from "../../app/MainData";
const PopularSearches = () => {
  return (
    <>
      <div>Services Provided</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 text-center">
        {ServicesData.map((item, index) => (
          <a href="/" key={index}>
            <div className="px-3">
              <ServicesCard
                imageUrl={item.imageUrl}
                title={item.title}
                // description={item.description}
              />
            </div>
          </a>
        ))}
      </div>
    </>
  );
};

export default PopularSearches;
