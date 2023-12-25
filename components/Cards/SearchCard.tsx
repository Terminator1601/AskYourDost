import React, { useEffect, useState } from "react";
import { db } from "@/database/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const SearchCard = () => {
  const [freeListings, setFreeListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const freeListingsCollection = collection(db, "FreeListing");
        const snapshot = await getDocs(freeListingsCollection);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFreeListings(data);
      } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {freeListings.map((listing, index) => (
        <div key={index} className="grid grid-cols-5 gap-3">
          <div>
            <img src={listing.shopImage} alt={listing.shopImage} />
          </div>
          <div className="grid col-span-3">
            <h2>{listing.name}</h2>
            <p>{listing.description}</p>
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

export default SearchCard;
