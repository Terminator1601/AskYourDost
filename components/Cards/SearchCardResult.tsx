// SearchCard.js
import React, { useEffect, useState } from "react";
import { db } from "../../database/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// Assuming FreeListing type has 'name', 'shopImage', and 'description' as optional properties
interface FreeListing {
  id: string;
  name?: string;
  shopImage?: string;
  description?: string;
  // Add other properties as needed...
}

interface SearchCardResultProps {
  searchTerm: string;
}

const SearchCardResult: React.FC<SearchCardResultProps> = ({ searchTerm }) => {
  const [freeListings, setFreeListings] = useState<FreeListing[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const freeListingsCollection = collection(db, "FreeListing");
        const snapshot = await getDocs(freeListingsCollection);
        const data: FreeListing[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter the listings based on the search term
        const filteredListings = data.filter((listing) =>
          listing.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFreeListings(filteredListings);
      } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <>
      {freeListings.map((listing, index) => (
        <div key={index} className="grid grid-cols-5 gap-3">
          <div>
            <img
              src={listing.shopImage}
              alt={listing.shopImage || "Image not available"}
            />
          </div>
          <div className="grid col-span-3">
            <h2>{listing.name || "Name not available"}</h2>
            <p>{listing.description || "Description not available"}</p>
          </div>
          <div>
            <button type="button">Show Details</button>
            <button type="button">Contact Us</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default SearchCardResult;
