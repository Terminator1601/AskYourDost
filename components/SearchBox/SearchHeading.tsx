import "tailwindcss/tailwind.css";
import React, { useEffect, useState } from "react";

const SearchHeading = () => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // Specify that searchQuery is a string

  useEffect(() => {
    // Fetch the search query from the URL on the client side
    setSearchQuery(
      new URLSearchParams(window.location.search).get("query") ?? ""
    );
  }, []);

  return (
    <div className="text-center font-mono p-5">Showing search results for {searchQuery}</div>
  );
};

export default SearchHeading;
