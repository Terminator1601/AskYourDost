import Cards from "../Cards/HomepageCards";
import { popularSectionData } from "@/app/MainData";
import React, { useEffect, useState } from "react";
import { db } from "@/database/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// Define the interface for the data from Firestore
interface Listing {
  id: string;
  // Add other properties as needed
}

const PopularSearches = () => {
  const [freeListings, setFreeListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const freeListingsCollection = collection(db, "FreeListing");
        const snapshot = await getDocs(freeListingsCollection);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Listing[]; // Assert that data is an array of Listing

        setFreeListings(data);
      } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="text-lg font-bold">Popular Searches</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 text-center">
        {popularSectionData.map((item, index) => (
          <a href="/" key={index} className="block">
            <div className="px-3">
              <Cards
                title={item.title}
                imageUrl={item.imageUrl}
                description={item.description}
              />
            </div>
          </a>
        ))}
      </div>
    </>
  );
};

export default PopularSearches;
