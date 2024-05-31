// SearchBox.tsx
"use client"
import React, { useState } from "react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter search query"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBox;





// // SearchBox.tsx
// "use client"
// import React, { useState } from "react";

// interface SearchBoxProps {
//   onSearch: (query: string) => void;
// }

// const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleSearch = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:3000/api/predict', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query: searchQuery }),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const result = await response.json();
//       onSearch(result);
//     } catch (error) {
//       console.error('There was a problem with the fetch operation:', error);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Enter search query"
//         value={searchQuery}
//         onChange={handleInputChange}
//       />
//       <button onClick={handleSearch}>Search</button>
//     </div>
//   );
// };

// export default SearchBox;
