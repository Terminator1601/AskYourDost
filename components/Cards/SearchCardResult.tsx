// SearchCard.js
import React, { useEffect, useState } from "react";
import { db } from "../../database/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

interface FreeListing {
  id: string;
  name?: string;
  shopImage?: string;
  description?: string;
}

interface SearchCardResultProps {
  searchTerm: string;
}

const SearchCardResult: React.FC<SearchCardResultProps> = ({ searchTerm }) => {
  const [freeListings, setFreeListings] = useState<FreeListing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-4">
            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {freeListings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">No results found for "{searchTerm}"</p>
        </div>
      ) : (
        freeListings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6">
              <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
                <img
                  src={listing.shopImage || '/placeholder-image.jpg'}
                  alt={listing.name || "Image not available"}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="md:col-span-3 space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 hover:text-[#0cc0df] transition-colors">
                  {listing.name || "Name not available"}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {listing.description || "Description not available"}
                </p>
              </div>
              
              <div className="flex flex-col justify-center space-y-3">
                <button
                  type="button"
                  className="w-full bg-[#0cc0df] hover:bg-[#0aa5c0] text-white font-medium px-6 py-2.5 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>Show Details</span>
                </button>
                
                <button
                  type="button"
                  className="w-full bg-[#5c941d] hover:bg-[#4a7a17] text-white font-medium px-6 py-2.5 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Contact Us</span>
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchCardResult;
