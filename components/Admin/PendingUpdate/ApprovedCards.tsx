// Import necessary dependencies
import React, { useEffect, useState } from "react";
import { db } from "../../../database/firebaseConfig";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

interface Listing {
  id: string;
  name?: string;
  shopImage?: string;
  description?: string;
  services?: string;
  // Add other properties as needed
}

interface ApprovedCardsProps {
  // Define any props needed by your component
}
// ... (existing imports)

const ApprovedCards: React.FC<ApprovedCardsProps> = () => {
  const [approvedListings, setApprovedListings] = useState<Listing[]>([]);

  useEffect(() => {
    const approvedListingsCollection = collection(db, "ApprovedListing");

    const unsubscribe = onSnapshot(approvedListingsCollection, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Listing[];

      setApprovedListings(data);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []); // Run this effect only once when the component mounts

  const handleEdit = async (listing: Listing) => {
    try {
      const freeListingsCollection = collection(db, "FreeListing");
      await addDoc(freeListingsCollection, listing);

      const approvedListingsCollection = collection(db, "ApprovedListing");
      await deleteDoc(doc(approvedListingsCollection, listing.id));

      setApprovedListings((prevListings) =>
        prevListings.filter((prevListing) => prevListing.id !== listing.id)
      );

      window.alert(
        "Listing edited successfully and moved to FreeListing table."
      );
    } catch (error) {
      console.error("Error editing listing: ", error);
    }
  };

  const handleDisapprove = async (listing: Listing) => {
    try {
      const approvedListingsCollection = collection(db, "ApprovedListing");
      await deleteDoc(doc(approvedListingsCollection, listing.id));

      setApprovedListings((prevListings) =>
        prevListings.filter((prevListing) => prevListing.id !== listing.id)
      );

      window.alert("Listing disapproved successfully.");
    } catch (error) {
      console.error("Error disapproving listing: ", error);
    }
  };

  return (
    <>
      {approvedListings.map((listing, index) => (
        <div
          key={`${listing.id}-${index}`}
          className="grid grid-cols-5 gap-3 p-2"
        >
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
              <button type="button" onClick={() => handleDisapprove(listing)}>
                Dis-Approve
              </button>
            </div>
            <div>
              <button type="button" onClick={() => handleEdit(listing)}>
                Edit
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ApprovedCards;
