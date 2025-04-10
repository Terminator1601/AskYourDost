import React, { useEffect, useState } from "react";
import { db } from "../../database/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import "../../app/globals.css";
import "tailwindcss/tailwind.css";
import SkeletonCard from "../Loader/SkeletonSearchCard";

interface Listing {
  id: string;
  name?: string;
  shopImage?: string;
  description?: string;
  services?: string;
  email?: string;
  address?: string;
  city?: string;
}

interface SearchCardProps {
  searchQuery: string;
}

const SearchCard: React.FC<SearchCardProps> = ({ searchQuery }) => {
  const [freeListings, setFreeListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const freeListingsCollection = collection(db, "FreeListing");
        const snapshot = await getDocs(freeListingsCollection);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Listing[];

        const filteredData = data.filter(
          (listing) =>
            (listing.name &&
              listing.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (listing.services &&
              listing.services
                .toLowerCase()
                .includes(searchQuery.toLowerCase()))
        );

        setFreeListings(filteredData);
      } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery]);

  return (
    <div className="space-y-4">
      {loading && <SkeletonCard />}
      {!loading &&
        freeListings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="grid lg:grid-cols-5 md:grid-cols-5 gap-4 p-4">
              <div className="relative h-48 lg:h-full rounded-lg overflow-hidden">
                <img 
                  src={listing.shopImage || '/images/placeholder.jpg'} 
                  alt={listing.name || 'Shop image'} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="col-span-3 space-y-3">
                <h2 className="text-2xl font-semibold text-gray-800 hover:text-[#0cc0df] transition-colors">
                  {listing.name || "No Name Available"}
                </h2>
                
                <p className="text-gray-600 line-clamp-2">{listing.description}</p>
                
                <div className="bg-[#e4e4e4] bg-opacity-30 rounded-lg p-3">
                  <h3 className="text-[#5c941d] font-medium mb-1">Services Offered:</h3>
                  <p className="text-gray-700">{listing.services}</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#e3a62f] mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-gray-600">Address:</p>
                      <p className="text-gray-800">{listing.address}</p>
                      <p className="text-gray-800">{listing.city}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-3">
                <Link
                  href={`/Details?name=${encodeURIComponent(
                    listing.name || ""
                  )}&email=${encodeURIComponent(
                    listing.email || ""
                  )}&service=${encodeURIComponent(listing.services || "")}`}
                  className="block w-full"
                >
                  <button
                    type="button"
                    className="w-full bg-[#0cc0df] hover:bg-[#0aa5c0] text-white font-medium px-6 py-2.5 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>View Details</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </Link>

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
        ))}
        {!loading && freeListings.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">No results found for "{searchQuery}"</p>
          </div>
        )}
    </div>
  );
};

export default SearchCard;
