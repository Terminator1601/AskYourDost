// SearchPage.tsx
import React, { useState } from "react";
import SearchBox from "./SearchBox";
import SearchResults from "./SearchResults";
import {popularSectionData} from "@/app/MainData" ; // Adjust the import path accordingly

const SearchPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<DataItem[]>([]);

  const handleSearch = (query: string) => {
    // Perform the search logic here
    const results = popularSectionData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
  };

  return (
    <div>
      <h1>Search Page</h1>
      <SearchBox onSearch={handleSearch} />
      <SearchResults data={searchResults} />
    </div>
  );
};

export default SearchPage;
