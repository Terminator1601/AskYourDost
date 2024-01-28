import React, { useEffect, useState } from "react";
import { db } from "../../database/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

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
      {loading}
      {!loading &&
        freeListings.map((listing) => (
          <div key={listing.id} className="grid grid-cols-5 gap-3 py-3 border ">
            <div>
              <img src={listing.shopImage} alt={listing.shopImage} />
            </div>
            <div className="grid col-span-3">
              <h2>{listing.name || "No Name Available"}</h2>
              <p>{listing.description}</p>
              <p>{listing.services}</p>
              <p>{listing.address}</p>
              <p>City : {listing.city}</p>
            </div>
            <div>
              <Link
                href={`/Details?name=${encodeURIComponent(
                  listing.name || ""
                )}&email=${encodeURIComponent(listing.email || "")}&service=${encodeURIComponent(listing.services || "")}`}
              >
                <button type="button">Show Details</button>
              </Link>

              <button type="button">Contact Us</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default SearchCard;
