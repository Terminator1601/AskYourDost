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
    <div className="space-y-4">
      {approvedListings.length === 0 ? (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-900">No approved listings</h3>
          <p className="mt-1 text-sm text-gray-500">Approved listings will appear here.</p>
        </div>
      ) : (
        approvedListings.map((listing) => (
          <div key={listing.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="p-4">
              <div className="flex items-start space-x-4">
                {/* Image */}
                <div className="flex-shrink-0">
                  <img
                    src={listing.shopImage || '/placeholder.png'}
                    alt={listing.name || 'Shop Image'}
                    className="w-24 h-24 rounded-lg object-cover bg-gray-100"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.png';
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {listing.name || "No Name Available"}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Approved
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {listing.description || "No description available"}
                  </p>
                  {listing.services && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {listing.services.split(',').map((service, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#5c941d]/10 text-[#5c941d]"
                        >
                          {service.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex-shrink-0 flex flex-col space-y-2">
                  <button
                    onClick={() => handleDisapprove(listing)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Disapprove
                  </button>
                  <button
                    onClick={() => handleEdit(listing)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0cc0df]"
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ApprovedCards;
