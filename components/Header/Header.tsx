"use client";
// Header.js
import React, { useState } from "react";
import { data } from "@/app/MainData"; // Import the data constant
import "tailwindcss/tailwind.css";
import login from "@/components/Login&Signup/SignIn";
import { useUser } from "@/database//User/UserContext";

interface DataItem {
  id: number;
  title: string;
}


const Header = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<DataItem[]>(data);

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    filterData(searchTerm);
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

  const { username, email, phone, updateUser } = useUser();


  return (
    <div className="grid grid-cols-1 md:grid-cols-5 px-0 lg:flex lg:flex-row lg:justify-between">
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
        {/* Display search results */}
        {/* <SearchResults data={filteredData} /> */}
      </div>
      <a href="/freeListing">
        <div className="text-center md:text-left px-0 py-6  text-xl md:col-span-2">
          Free listing
        </div>
      </a>
      <a href="/Login">
        <div className="text-center md:text-left px-0 py-6  text-xl md:col-span-2">
          Login/Signup
        </div>
      </a>
      {/* <login /> */}
      <div>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
    </div>
    </div>
    // </div>
  );
};

export default Header;
