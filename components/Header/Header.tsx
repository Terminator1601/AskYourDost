"use client";

import React, { useState } from "react";
import { data } from "../../app/MainData";
import "tailwindcss/tailwind.css";

interface DataItem {
  id: number;
  title: string;
}

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<DataItem[]>(data);

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    filterData(searchTerm);

    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      // Redirect to SearchResults page with the search term as a query parameter
      const encodedSearchTerm = encodeURIComponent(searchTerm);
      window.location.href = `/SearchResults?query=${encodedSearchTerm}`;
    }
  };

  const filterData = (searchTerm: string) => {
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:text-center px-0 lg:flex lg:flex-row lg:justify-between">
      <div className="text-center md:text-left px-0 py-6  text-2xl md:col-span-2">
        <a href="/">
          <span style={{ color: "var(--orange)" }}>Ask</span>
          <span style={{ color: "var(--green)" }}>Your</span>
          <span style={{ color: "var(--blue)" }}>Dost</span>
        </a>
      </div>

      <div className="text-center md:text-left py-6  md:col-span-2">
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
        <div className="text-center md:text-left px-0 py-6  text-xl md:col-span-2 flex">
          <img src="/images/freelisting-icon.png" alt="freelisting" />
          Free listing
        </div>
      </a>
      <a href="/Login">
        <div className="text-center md:text-left px-0 py-6  text-xl md:col-span-2 flex">
          <img src="/images/login-icon.png" alt="login icon" className="text-center justify-center" />
          Login/Signup
        </div>
      </a>
    </div>
  );
};

export default Header;
