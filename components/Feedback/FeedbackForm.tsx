// FeedbackForm.tsx
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../database/firebaseConfig";

// Define FeedbackData type
export interface FeedbackData {
  name: string;
  feedbackText: string;
  rating: number;
  // Add other properties as needed
}

const FeedbackForm: React.FC<{
  onSubmit: (feedbackData: FeedbackData) => void;
}> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState<number | null>(null);

  const handleSubmit = () => {
    // Call the onSubmit prop with the feedback data
    onSubmit({
      name,
      feedbackText: feedback,
      rating: rating || 0,
    });

    // Reset the form after submission
    setName("");
    setFeedback("");
    setRating(null);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white border rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Feedback Form</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="feedback"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Feedback
          </label>
          <textarea
            id="feedback"
            className="w-full p-2 border rounded-md resize-none focus:outline-none focus:border-blue-500"
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Rating
          </label>
          <select
            id="rating"
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={rating || ""}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value="" disabled>
              Select a rating
            </option>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value} stars
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
