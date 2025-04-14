// FeedbackForm.tsx
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../database/firebaseConfig";

// Define FeedbackData type
export interface FeedbackData {
  name: string;
  feedbackText: string;
  rating: number;
  timestamp: Date;
}

const FeedbackForm: React.FC<{
  onSubmit: (feedbackData: FeedbackData) => void;
}> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!feedback.trim()) {
      newErrors.feedback = "Feedback is required";
    }
    
    if (!rating) {
      newErrors.rating = "Please select a rating";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const feedbackData: FeedbackData = {
        name,
        feedbackText: feedback,
        rating: rating || 0,
        timestamp: new Date(),
      };

      await onSubmit(feedbackData);

      // Reset form
      setName("");
      setFeedback("");
      setRating(null);
      setErrors({});
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (currentRating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRating(value)}
            className={`focus:outline-none transition-colors duration-200 ${
              value <= (rating || 0)
                ? "text-yellow-400"
                : "text-gray-300 hover:text-yellow-200"
            }`}
          >
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`block w-full rounded-md shadow-sm ${
                errors.name
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-[#5c941d] focus:border-[#5c941d]"
              } sm:text-sm`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
        </div>

        {/* Rating Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          {renderStars(rating || 0)}
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
          )}
        </div>

        {/* Feedback Input */}
        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
            Your Feedback
          </label>
          <div className="mt-1">
            <textarea
              id="feedback"
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className={`block w-full rounded-md shadow-sm ${
                errors.feedback
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-[#5c941d] focus:border-[#5c941d]"
              } sm:text-sm`}
              placeholder="Share your experience..."
            />
            {errors.feedback && (
              <p className="mt-1 text-sm text-red-600">{errors.feedback}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#5c941d] hover:bg-[#5c941d]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5c941d] ${
              isSubmitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Submit Feedback"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
