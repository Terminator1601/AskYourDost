import React from "react";

interface DataItem {
  id: number;
  title: string;
  // Add other properties as needed
}

interface SearchResultsProps {
  data: DataItem[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ data }) => {
  return (
    <div>
      <h2>Search Results:</h2>
      {data.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.title}</li>
            // Add other properties as needed
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
