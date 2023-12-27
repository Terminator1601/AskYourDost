// Import necessary dependencies
import React, { useEffect, useState } from "react";
import { db } from "../../../database/firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

// Define the Listing interface
interface Listing {
  id: string;
  name?: string;
  shopImage?: string;
  description?: string;
  services?: string;
  // Add other properties as needed
}

// Define any props needed by your component
interface CardsForAdminProps {
  // Define any props needed by your component
}

const CardsForAdmin: React.FC<CardsForAdminProps> = () => {
  const [freeListings, setFreeListings] = useState<Listing[]>([]);

  useEffect(() => {
    const freeListingsCollection = collection(db, "FreeListing");

    // Set up a real-time listener for the FreeListing collection
    const unsubscribe = onSnapshot(freeListingsCollection, (snapshot) => {
      console.log("FreeListing collection updated:", snapshot.docs.length);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Listing[];

      setFreeListings(data);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const approveListing = async (listing: Listing) => {
    try {
      console.log("Deleting from FreeListing:", listing.id);
      const freeListingsCollection = collection(db, "FreeListing");
      await deleteDoc(doc(freeListingsCollection, listing.id));

      console.log("Adding to ApprovedListing:", listing);
      const approvedListingsCollection = collection(db, "ApprovedListing");
      await addDoc(approvedListingsCollection, listing);

      console.log("Deletion and approval successful.");

      // Notify the user with a window.alert
      window.alert("Listing approved successfully!");
    } catch (error) {
      console.error("Error approving listing: ", error);
      // Notify the user with a window.alert in case of an error
      window.alert("Error approving listing. Please try again.");
    }
  };

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
          <div className="grid grid-rows-2">
            <div>
              <button
                type="button"
                onClick={() => {
                  approveListing(listing);
                  // No need to manually update state; it will be handled by the real-time listener
                }}
              >
                Approve
              </button>
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
