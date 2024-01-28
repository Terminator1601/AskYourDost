// FeedbackList.tsx
import React, { useEffect, useState } from "react";
import { db } from "../../database/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

interface Feedback {
  id: string;
  name: string;
  feedbackText: string;
  rating: number;
  // Add other properties as needed
}

interface FeedbackListProps {
  name: string;
  email: string;
  service: string;
}

const FeedbackList: React.FC<FeedbackListProps> = ({ name, email, service }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const serviceFeedbacksCollection = collection(db, "ServiceFeedbacks");

        const q = query(
          serviceFeedbacksCollection,
          where("listingName", "==", name),
          where("email", "==", email),
          where("service", "==", service)
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Feedback[];

        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks from Firestore: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name, email, service]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Feedbacks for {service}</h2>
      {loading && <p>Loading feedbacks...</p>}
      {!loading && feedbacks.length === 0 && <p>No feedbacks available.</p>}
      {!loading && feedbacks.length > 0 && (
        <ul>
          {feedbacks.map((feedback) => (
            <li key={feedback.id}>
              <strong>{feedback.name}</strong>
              <p>Rating: {feedback.rating}</p>
              <p>{feedback.feedbackText}</p>
              {/* Add other feedback details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeedbackList;
