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
    <>
      {loading && <SkeletonCard />}
      {!loading &&
        freeListings.map((listing) => (
          <div
            key={listing.id}
            className="grid lg:grid-cols-5 md:grid-cols-5 gap-3 py-3 border "
          >
            <div>
              <img src={listing.shopImage} alt={listing.shopImage} />
            </div>
            <div className="grid col-span-3 font-serif">
              <h2>{listing.name || "No Name Available"}</h2>
              <p>{listing.description}</p>
              <p>{listing.services}</p>
              <p>Address : {listing.address}</p>
              <p>City : {listing.city}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 p-3">
  <div className="px-5 flex justify-center items-center">
    <Link
      // className="text-center"
      href={`/Details?name=${encodeURIComponent(
        listing.name || ""
      )}&email=${encodeURIComponent(
        listing.email || ""
      )}&service=${encodeURIComponent(listing.services || "")}`}
    >
      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Show Details
      </button>
    </Link>
  </div>
  <div className="px-5 flex justify-center items-center">
    <button
      type="button"
      className="bg-green-500 text-white px-4 py-2 rounded"
    >
      Contact Us
    </button>
  </div>
</div>

          </div>
        ))}
    </>
  );
};

export default SearchCard;
