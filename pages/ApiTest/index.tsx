// import { useEffect, useState } from 'react';

// // Define the interface for the response data
// interface HealthCheckerResponse {
//   status: string;
//   message: string;
// }

// export default function Home() {
//   // Use the interface to type the state
//   const [data, setData] = useState<HealthCheckerResponse | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetch('http://127.0.0.1:3000/api/healthchecker')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data: HealthCheckerResponse) => setData(data))
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         setError(error.toString());
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Health Checker</h1>
//       {error ? (
//         <p>Error: {error}</p>
//       ) : data ? (
//         <div>
//           <p>Status: {data.status}</p>
//           <p>Message: {data.message}</p>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }


import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const index: React.FC = () => {
  const router = useRouter();
  const { category } = router.query;
  const [searchCategory, setSearchCategory] = useState<string | null>(null);

  useEffect(() => {
    if (category) {
      setSearchCategory(category as string);
    }
  }, [category]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {searchCategory ? (
        <p className="text-lg">
          Predicted Category: <span className="font-semibold">{searchCategory}</span>
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default index;
