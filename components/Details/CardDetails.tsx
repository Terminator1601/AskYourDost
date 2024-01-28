// CardDetails.tsx
import React, { useEffect, useState } from "react";
import { db } from "../../database/firebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import "tailwindcss/tailwind.css";
import FeedbackForm, { FeedbackData } from "../Feedback/FeedbackForm";

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
        listingName: freeListings[0]?.name || "", // Adjust the field names as per your schema
        service: freeListings[0]?.services || "",
        email: freeListings[0]?.email || "",
        ...feedbackData,
      });
      console.log("Feedback submitted successfully.");
    } catch (error) {
      console.error("Error storing feedback in Firestore:", error);
    }
  };

  return freeListings.map((listing) => (
    <div key={listing.id}>
      <div className="grid grid-cols-5 p-8 justify-center text-left">
        <div className="text-right">
          <img
            src={listing.shopImage}
            className="w-64 h-64 max-h-full  object-contain"
            alt="Shop Image"
          ></img>
        </div>
        <div className="lg:col-span-3 text-center">
          <h1>Name: {listing.name}</h1>
          <h1>Email: {listing.email}</h1>
          <h1>Description: {listing.description}</h1>
          <h1>Phone no: {listing.phone}</h1>
          <h1>Services: {listing.services}</h1>
        </div>
        <div className="space-x-4">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Book Now
          </button>
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Contact Us
          </button>
        </div>
      </div>
      {/* Pass onSubmit function to the Feedback component */}
      <FeedbackForm onSubmit={handleFeedbackSubmit} />
      <hr />
    </div>
  ));
};

export default CardDetails;
