import React, { useEffect, useState } from "react";
import { db } from "../../database/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import "tailwindcss/tailwind.css";

interface Listing {
  id: string;
  name?: string;
  shopImage?: string;
  description?: string;
  services?: string;
  email?: string;
  phone?: string;
}

const CardDetails = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [freeListings, setFreeListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const queryFromUrl = new URLSearchParams(window.location.search).get(
      "query"
    );
    setSearchQuery(queryFromUrl || "");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const freeListingsCollection = collection(db, "FreeListing");
        const q = query(
          freeListingsCollection,
          where("name", "==", searchQuery)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Listing[];

        setFreeListings(data);
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

  return freeListings.map((listing) => (
    <div className="grid grid-cols-2 p-8">
      <div className=" text-right">
        <img src={listing.shopImage} className="w-64 h-64"></img>
      </div>
      <div key={listing.id}>
        <h1>Name: {listing.name}</h1>
        <h1>Email: {listing.email}</h1>
        <h1>Description: {listing.description}</h1>
        <h1>Phone no: {listing.phone}</h1>
        <h1>Services: {listing.services}</h1>
      </div>
    </div>
  ));
};

export default CardDetails;
