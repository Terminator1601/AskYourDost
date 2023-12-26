// import React from 'react'
import "tailwindcss/tailwind.css";
import React, { useEffect, useState } from "react";

const SearchHeading = () => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch the search query from the URL on the client side
    setSearchQuery(new URLSearchParams(window.location.search).get("query"));
  }, []);
  return (
    <div className="text-center">Showing search results for {searchQuery}</div>
  );
};

export default SearchHeading;
