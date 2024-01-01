import React, { useEffect, useState } from "react";
import { db } from "../../database/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

interface Listing {
  id: string;
  name?: string;
  shopImage?: string;
  description?: string;
  services?: string;
  email?: string;
  phone?: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [freeListings, setFreeListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const queryFromUrl = new URLSearchParams(window.location.search).get(
      "query"
    );
    setSearchQuery(queryFromUrl || ""); // Use the queryFromUrl or an empty string if it's null
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const freeListingsCollection = collection(db, "FreeListing");
        const q = query(freeListingsCollection, where("name", "==", searchQuery));
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

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        freeListings.map((listing) => (
          <div key={listing.id}>
            <h1>name: {listing.name}</h1>
            <h1>email: {listing.email}</h1>
            <h1>description: {listing.description}</h1>
            <h1>shopimage: {listing.shopImage}</h1>
            <h1>phone no: {listing.phone}</h1>
            <h1>services: {listing.services}</h1>
          </div>
        ))
      )}
    </div>
  );
};

export default Index;
