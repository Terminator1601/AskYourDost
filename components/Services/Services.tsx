import React from "react";
import ServicesCard from "./ServicesCard";
import { ServicesData } from "../../app/MainData";
const PopularSearches = () => {
  return (
    <>
      <div className="">
        <div className="text-lg font-bold py-8 pl-5">Services Provided</div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 text-center place-content-center ">
          {ServicesData.map((item, index) => (
            <a href={`/Services`} key={index}>
              <div className="px-3">
                <ServicesCard imageUrl={item.imageUrl} title={item.title} />
              </div>
            </a>
          ))}
        </div>
        <br />
        <br />
      </div>
    </>
  );
};

export default PopularSearches;
