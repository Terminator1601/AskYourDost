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
    <div className="space-y-4">
      {freeListings.length === 0 ? (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-900">No pending listings</h3>
          <p className="mt-1 text-sm text-gray-500">New listings will appear here for review.</p>
        </div>
      ) : (
        freeListings.map((listing) => (
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
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {listing.name || "No Name Available"}
                  </h3>
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
                    onClick={() => approveListing(listing)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#5c941d] hover:bg-[#5c941d]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5c941d]"
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Approve
                  </button>
                  <button
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

export default CardsForAdmin;
