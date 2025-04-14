// CardDetails.tsx
import React, { useEffect, useState } from "react";
import { db } from "../../database/firebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import "tailwindcss/tailwind.css";
import FeedbackForm, { FeedbackData } from "../Feedback/FeedbackForm";
import FeedbackList from "../Feedback/FeedbackList";
import { FaPhone, FaEnvelope, FaInfoCircle, FaTools } from 'react-icons/fa';

// Define Listing type
interface Listing {
  id: string;
  name?: string;
  shopImage?: string;
  description?: string;
  services?: string;
  email?: string;
  phone?: string;
}

const CardDetails: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [freeListings, setFreeListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showContactForm, setShowContactForm] = useState<boolean>(false);

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

        const nameParam = new URLSearchParams(window.location.search).get(
          "name"
        );
        const emailParam = new URLSearchParams(window.location.search).get(
          "email"
        );
        const serviceParam = new URLSearchParams(window.location.search).get(
          "service"
        );

        const q = query(
          freeListingsCollection,
          where("name", "==", nameParam),
          where("email", "==", emailParam),
          where("services", "==", serviceParam)
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

    fetchData();
  }, []);

  const handleFeedbackSubmit = async (feedbackData: FeedbackData) => {
    try {
      const serviceFeedbacksCollection = collection(db, "ServiceFeedbacks");
      await addDoc(serviceFeedbacksCollection, {
        listingName: freeListings[0]?.name || "",
        service: freeListings[0]?.services || "",
        email: freeListings[0]?.email || "",
        ...feedbackData,
        timestamp: new Date(),
      });

      // Show success notification
      const notification = document.getElementById('notification');
      if (notification) {
        notification.classList.remove('hidden');
        setTimeout(() => {
          notification.classList.add('hidden');
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error("Error storing feedback in Firestore:", error);
    }
  };

  return freeListings.map((listing) => (
    <div key={listing.id} className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Success Notification */}
      <div id="notification" className="hidden fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg">
        Feedback submitted successfully!
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-8 p-8">
          {/* Image Section */}
          <div className="flex justify-center items-center">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
              {listing.shopImage ? (
                <img
                  src={listing.shopImage}
                  className="w-full h-full object-cover"
                  alt={listing.name || "Shop Image"}
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">{listing.name}</h1>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <FaEnvelope className="text-[#5c941d]" />
                  <span>{listing.email}</span>
                </div>
                
                <div className="flex items-center space-x-3 text-gray-600">
                  <FaPhone className="text-[#5c941d]" />
                  <span>{listing.phone}</span>
                </div>
                
                <div className="flex items-start space-x-3 text-gray-600">
                  <FaInfoCircle className="text-[#5c941d] mt-1" />
                  <p className="flex-1">{listing.description}</p>
                </div>
                
                <div className="flex items-center space-x-3 text-gray-600">
                  <FaTools className="text-[#5c941d]" />
                  <div className="flex flex-wrap gap-2">
                    {listing.services?.split(',').map((service, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#5c941d]/10 text-[#5c941d]"
                      >
                        {service.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-4">
            <button
              type="button"
              className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#5c941d] hover:bg-[#5c941d]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5c941d] transition-colors duration-200"
            >
              Book Now
            </button>
            
            <button
              type="button"
              onClick={() => setShowContactForm(!showContactForm)}
              className="w-full inline-flex justify-center items-center px-6 py-3 border border-[#0cc0df] rounded-md shadow-sm text-base font-medium text-[#0cc0df] bg-white hover:bg-[#0cc0df]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0cc0df] transition-colors duration-200"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="mt-12 space-y-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Customer Feedback</h2>
            <FeedbackList
              name={listing.name || ""}
              email={listing.email || ""}
              service={listing.services || ""}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Leave Your Feedback</h2>
            <FeedbackForm onSubmit={handleFeedbackSubmit} />
          </div>
        </div>
      </div>
    </div>
  ));
};

export default CardDetails;
