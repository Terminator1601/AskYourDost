// // PopularSearches.jsx

// import React from "react";
// import Cards from "./Cards";
// import { popularSectionData } from "@/app/MainData";
// const PopularSearches = () => {
//   return (
//     <>
//       <div>Popular Searches</div>
//       <div className="grid grid-cols-6 text-center">
//         {popularSectionData.map((item, index) => (
//           <a href="/" key={index}>
//             <div className="px-3">
//               <Cards
//                 title={item.title}
//                 imageUrl={item.imageUrl}
//                 description={item.description}
//               />
//             </div>
//           </a>
//         ))}
//       </div>
//     </>
//   );
// };

// export default PopularSearches;




// PopularSearches.jsx

import React from "react";
import Cards from "./Cards";
import { popularSectionData } from "@/app/MainData";

const PopularSearches = () => {
  return (
    <>
      <div className=" text-lg font-bold">Popular Searches</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 text-center">
        {popularSectionData.map((item, index) => (
          <a href="/" key={index} className="block">
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
