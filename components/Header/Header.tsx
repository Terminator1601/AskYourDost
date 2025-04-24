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
      const response = await fetch("http://localhost:5000/api/predict", {
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
    <header className="sticky top-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center text-2xl font-bold">
              <span className="text-[#e3a62f]">Ask</span>
              <span className="text-[#5c941d]">Your</span>
              <span className="text-[#0cc0df]">Dost</span>
            </a>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search for services..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 pl-10 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0cc0df] focus:border-transparent transition-all duration-200"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button
                type="submit"
                className="absolute inset-y-0 right-0 px-4 text-white bg-[#5c941d] hover:bg-[#528a1a] rounded-r-lg transition-colors duration-200"
              >
                Search
              </button>
            </form>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <a
              href="/freeListing"
              className="flex items-center space-x-2 text-gray-700 hover:text-[#e3a62f] transition-colors duration-200"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="font-medium">Free Listing</span>
            </a>

            {!isLoggedIn ? (
              <a
                href="/Login"
                className="flex items-center space-x-2 text-gray-700 hover:text-[#0cc0df] transition-colors duration-200"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium">Login/Signup</span>
              </a>
            ) : (
              <div className="relative">
                <button
                  onClick={handleWelcomeClick}
                  className="flex items-center space-x-2 text-gray-700 hover:text-[#5c941d] transition-colors duration-200"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">{usernameCookie}</span>
                  <svg className={`h-4 w-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#5c941d] transition-colors duration-200"
                    >
                      Change Username
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#5c941d] transition-colors duration-200"
                    >
                      Change Password
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
