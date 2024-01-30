import Cards from "../Cards/HomepageCards";
import React, { useEffect, useState } from "react";
import { db } from "../../database/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import SkeletonCard from "../Loader/SkeletonCard";

// Define the interface for the data from Firestore
interface Listing {
  id: string;
  name: string;
  shopImage: string;
  description: string;
  timestamp: number;
  email: string;
  services: string;
  // Add other properties as needed
}

const RecentlyAdded = () => {
  const [freeListings, setFreeListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const freeListingsCollection = collection(db, "ApprovedListing");
        const snapshot = await getDocs(freeListingsCollection);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Listing[];

        // Sort the data by the timestamp property in descending order
        const sortedData = data.sort((a, b) => b.timestamp - a.timestamp);

        // Take the latest 6 entries
        const latestEntries = sortedData.slice(0, 6);

        setFreeListings(latestEntries);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <div className="text-lg font-bold py-8 pl-5">Recently Added</div>
      {loading ? (
        <SkeletonCard /> // Display a loader while data is being fetched
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 text-center">
          {freeListings.map((item) => (
            <a
            href={`/Details?name=${encodeURIComponent(
              item.name || ""
            )}&email=${encodeURIComponent(item.email || "")}&service=${encodeURIComponent(item.services || "")}`}
              key={item.id}
              className="block"
            >
              <div className="px-3">
                <Cards
                  title={item.name}
                  imageUrl={item.shopImage}
                  description={item.description}
                />
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyAdded;
