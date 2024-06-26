// import React, { useState } from "react";
// import Link from "next/link"; // Import Link from next/link
// import { navItems } from "../../app/MainData";

// interface NavItemProps {
//   icon: string;
//   text: string;
// }

// const NavItem: React.FC<NavItemProps> = ({ icon, text }) => (
//   <div className="text-center items-center py-3 px-10   hover:rounded-full hover:bg-zinc-100">
//     <Link href={`/SearchResults?category=${encodeURIComponent(text)}`}>
//       <div className="text-center items-center flex ">
//         <img
//           src={icon}
//           alt={text}
//           className="w-7 py-2 text-center items-center"
//         />
//         {text}
//       </div>
//     </Link>
//   </div>
// );

// const Navbar = () => {
//   const [showItems, setShowItems] = useState(false);

//   const toggleItems = () => {
//     setShowItems(!showItems);
//   };

//   return (
//     <>
//       {/* Toggle Button for Mobile View */}
//       <div className="lg:hidden text-center w-full py-3 ">
//         <button
//           onClick={toggleItems}
//           className="flex items-center justify-center w-full"
//         >
//           <img
//             src="/images/downwardArrow.png" // Replace with your arrow icon path
//             alt="Toggle"
//             className={`w-5 transform ${showItems ? "rotate-180" : "animate-bounce"}`}
//           />
//           <p>Options</p>
//         </button>
//       </div>

//       {/* Navigation Items */}
//       <div
//         className={`text-center justify-center items-center grid grid-cols-1 md:grid-cols-6 px-2 lg:flex lg:flex-row lg:justify-between ${
//           showItems ? "" : "hidden"
//         }`}
//       >
//         {navItems.map((item, index) => (
//           <NavItem key={index} {...item} />
//         ))}
//       </div>

//       <hr />
//     </>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import Link from "next/link"; // Import Link from next/link
import { navItems } from "../../app/MainData";

interface NavItemProps {
  icon: string;
  text: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text }) => (
  <div className="text-center items-center py-3 px-4 hover:rounded-full hover:bg-zinc-100">
    <a className="flex items-center justify-center space-x-2">
      <Link href={`/SearchResults?category=${encodeURIComponent(text)}`}>
        <img src={icon} alt={text} className="w-7 h-7" />
        <span>{text}</span>
      </Link>
    </a>
  </div>
);

const Navbar = () => {
  const [showItems, setShowItems] = useState(false);

  const toggleItems = () => {
    setShowItems(!showItems);
  };

  return (
    <>
      {/* Toggle Button for Mobile View */}
      <div className="lg:hidden text-center w-full py-3">
        <button
          onClick={toggleItems}
          className="flex items-center justify-center w-full space-x-2"
        >
          <img
            src="/images/downwardArrow.png" // Replace with your arrow icon path
            alt="Toggle"
            className={`w-5 transform ${
              showItems ? "rotate-180" : "animate-bounce"
            }`}
          />
          <p>Options</p>
        </button>
      </div>

      {/* Navigation Items */}
      <div
        className={`text-center justify-center items-center grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 px-2 lg:flex lg:flex-row lg:justify-between ${
          showItems ? "block" : "hidden lg:flex"
        }`}
      >
        {navItems.map((item, index) => (
          <NavItem key={index} {...item} />
        ))}
      </div>

      <hr className="mt-4" />
    </>
  );
};

export default Navbar;
