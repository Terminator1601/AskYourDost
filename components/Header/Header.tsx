// "use client";

// import React, { useState, useEffect } from "react";
// import { data } from "../../app/MainData";
// import Cookies from "universal-cookie";
// import "tailwindcss/tailwind.css";

// interface DataItem {
//   id: number;
//   title: string;
// }

// const Header: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [filteredData, setFilteredData] = useState<DataItem[]>(data);
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [usernameCookie, setUsernameCookie] = useState<string | undefined>(
//     undefined
//   );
//   const [showDropdown, setShowDropdown] = useState<boolean>(false);

//   useEffect(() => {
//     const cookies = new Cookies();
//     const storedUsername = cookies.get("username");

//     setIsLoggedIn(!!storedUsername);
//     setUsernameCookie(storedUsername);
//   }, []);

//   const handleSearchSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     // Send the search term to the backend for prediction
//     try {
//       const response = await fetch("http://localhost:3000/api/predict", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ query: searchTerm }),
//       });

//       const result = await response.json();
//       const category = result.category;

//       // Redirect to the SearchResults page with the category as a query parameter
//       if (typeof window !== "undefined") {
//         const encodedCategory = encodeURIComponent(category);
//         window.location.href = `/SearchResults?query=${searchTerm}&category=${encodedCategory}`;
//       }
//     } catch (error) {
//       console.error("Error fetching prediction:", error);
//     }
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleWelcomeClick = () => {
//     setShowDropdown((prev) => !prev);
//   };

//   const handleLogout = () => {
//     const cookies = new Cookies();
//     cookies.remove("username");

//     setIsLoggedIn(false);
//     setShowDropdown(false);
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-4 md:text-center px-4 lg:flex lg:flex-row lg:justify-between">
//       <div className="text-center md:text-left px-0 py-6 text-2xl md:col-span-2">
//         <a href="/">
//           <span style={{ color: "var(--orange)" }}>Ask</span>
//           <span style={{ color: "var(--green)" }}>Your</span>
//           <span style={{ color: "var(--blue)" }}>Dost</span>
//         </a>
//       </div>

//       <div className="text-center md:text-left py-6 md:col-span-2">
//         <form
//           onSubmit={handleSearchSubmit}
//           className="flex items-center justify-center"
//         >
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//             className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 w-full md:w-auto"
//           />
//           <button
//             type="submit"
//             className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-3xl"
//           >
//             Search
//           </button>
//         </form>
//       </div>

//       <a href="/freeListing">
//         <div className="justify-center md:text-left px-0 py-6 text-xl md:col-span-2 flex">
//           <img src="/images/freelisting-icon.png" alt="freelisting" />
//           Free listing
//         </div>
//       </a>

//       {!isLoggedIn ? (
//         <>
//           <a href="/Login">
//             <div className="justify-center md:text-left px-0 py-6 text-xl md:col-span-2 flex">
//               <img
//                 src="/images/login-icon.png"
//                 alt="login icon"
//                 className="text-center justify-center h-6 w-6 mr-2"
//               />
//               Login/Signup
//             </div>
//           </a>
//         </>
//       ) : (
//         <div className="relative">
//           <span
//             onClick={handleWelcomeClick}
//             className="cursor-pointer justify-center md:text-left px-0 py-6 text-xl md:col-span-2 flex items-center"
//           >
//             Welcome, {usernameCookie} <span className="ml-2">&#9660;</span>
//           </span>

//           {showDropdown && (
//             <div className="absolute z-10 mt-2 bg-white border rounded-md shadow-md">
//               <ul>
//                 <li>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
//                   >
//                     Change Username
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
//                   >
//                     Change Password
//                   </a>
//                 </li>
//                 <li>
//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Header;




"use client";

import React, { useState, useEffect } from "react";
import { data } from "../../app/MainData";
import Cookies from "universal-cookie";
import "tailwindcss/tailwind.css";

interface DataItem {
  id: number;
  title: string;
}

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<DataItem[]>(data);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [usernameCookie, setUsernameCookie] = useState<string | undefined>(
    undefined
  );
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    const cookies = new Cookies();
    const storedUsername = cookies.get("username");

    setIsLoggedIn(!!storedUsername);
    setUsernameCookie(storedUsername);
  }, []);

  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
      alert("Please enter a search term.");
      return;
    }

    // Send the search term to the backend for prediction
    try {
      const response = await fetch("http://localhost:3000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchTerm }),
      });

      const result = await response.json();
      const category = result.category;

      // Redirect to the SearchResults page with the category as a query parameter
      if (typeof window !== "undefined") {
        const encodedCategory = encodeURIComponent(category);
        window.location.href = `/SearchResults?query=${searchTerm}&category=${encodedCategory}`;
      }
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleWelcomeClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    const cookies = new Cookies();
    cookies.remove("username");

    setIsLoggedIn(false);
    setShowDropdown(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:text-center px-4 lg:flex lg:flex-row lg:justify-between">
      <div className="text-center md:text-left px-0 py-6 text-2xl md:col-span-2">
        <a href="/">
          <span style={{ color: "var(--orange)" }}>Ask</span>
          <span style={{ color: "var(--green)" }}>Your</span>
          <span style={{ color: "var(--blue)" }}>Dost</span>
        </a>
      </div>

      <div className="text-center md:text-left py-6 md:col-span-2">
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center justify-center"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 w-full md:w-auto"
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-3xl"
          >
            Search
          </button>
        </form>
      </div>

      <a href="/freeListing">
        <div className="justify-center md:text-left px-0 py-6 text-xl md:col-span-2 flex">
          <img src="/images/freelisting-icon.png" alt="freelisting" />
          Free listing
        </div>
      </a>

      {!isLoggedIn ? (
        <>
          <a href="/Login">
            <div className="justify-center md:text-left px-0 py-6 text-xl md:col-span-2 flex">
              <img
                src="/images/login-icon.png"
                alt="login icon"
                className="text-center justify-center h-6 w-6 mr-2"
              />
              Login/Signup
            </div>
          </a>
        </>
      ) : (
        <div className="relative">
          <span
            onClick={handleWelcomeClick}
            className="cursor-pointer justify-center md:text-left px-0 py-6 text-xl md:col-span-2 flex items-center"
          >
            Welcome, {usernameCookie} <span className="ml-2">&#9660;</span>
          </span>

          {showDropdown && (
            <div className="absolute z-10 mt-2 bg-white border rounded-md shadow-md">
              <ul>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                  >
                    Change Username
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                  >
                    Change Password
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
