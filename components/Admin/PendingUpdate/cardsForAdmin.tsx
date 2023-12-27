// cardsForAdmin.tsx
import React, { useEffect, useState } from "react";
import { db } from "../../../database/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

interface Listing {
  id: string;
  name?: string;
  shopImage?: string;
  description?: string;
  services?: string;
  // Add other properties as needed
}

interface CardsForAdminProps {
  // Define any props needed by your component
}

const CardsForAdmin: React.FC<CardsForAdminProps> = () => {
  const [freeListings, setFreeListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const freeListingsCollection = collection(db, "FreeListing");
        const snapshot = await getDocs(freeListingsCollection);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Listing[];

        setFreeListings(data);
      } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
      }
    };

    fetchData();
  }, []); // Run this effect only once when the component mounts

  return (
    <>
      {freeListings.map((listing) => (
        <div key={listing.id} className="grid grid-cols-5 gap-3 p-2">
          <div>
            <img src={listing.shopImage} alt={listing.shopImage} />
          </div>
          <div className="grid col-span-3">
            <h2>{listing.name || "No Name Available"}</h2>
            <p>{listing.description}</p>
            <hr />
          </div>
          <div className="grid grid-rows-2 ">
            <div>
              <button type="button">Approve</button>
            </div>
            <div>
              <button type="button">Edit</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardsForAdmin;
