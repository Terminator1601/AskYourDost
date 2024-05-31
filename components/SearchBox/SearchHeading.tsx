import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SearchHeading = () => {
  const router = useRouter();
  const { category } = router.query;
  const [searchQuery, setSearchQuery] = useState<string>(""); // Specify that searchQuery is a string

  useEffect(() => {
  //   // Fetch the search query from the URL on the client side
  //   setSearchQuery(
  //     new URLSearchParams(window.location.search).get("query") ?? ""
  //   );
  // }, []);

  if (category) {
    setSearchQuery(category as string);
  }
}, [category]);

  return (
    <div className="text-center font-mono p-5">Showing search results for {searchQuery}</div>
  );
};

export default SearchHeading;
