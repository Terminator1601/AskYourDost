// FeedbackList.tsx
import React, { useEffect, useState } from "react";
import { db } from "../../database/firebaseConfig";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

interface Feedback {
  id: string;
  name: string;
  feedbackText: string;
  rating: number;
  timestamp: Date;
}

interface FeedbackListProps {
  name: string;
  email: string;
  service: string;
}

const FeedbackList: React.FC<FeedbackListProps> = ({
  name,
  email,
  service,
}) => {
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
          where("service", "==", service),
          orderBy("timestamp", "desc")
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

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((value) => (
          <svg
            key={value}
            className={`w-4 h-4 ${
              value <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5c941d]"></div>
      </div>
    );
  }

  if (!loading && feedbacks.length === 0) {
    return (
      <div className="text-center py-8">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 48 48"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <p className="mt-4 text-lg text-gray-600">No feedback available yet</p>
        <p className="text-sm text-gray-500">Be the first one to leave a review!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {feedbacks.map((feedback) => (
        <div
          key={feedback.id}
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#5c941d]/10 flex items-center justify-center">
                  <span className="text-[#5c941d] font-medium">
                    {feedback.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">{feedback.name}</h3>
                <div className="mt-1 flex items-center space-x-2">
                  {renderStars(feedback.rating)}
                  <span className="text-sm text-gray-500">
                    {formatDate(feedback.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-600 text-sm">{feedback.feedbackText}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
