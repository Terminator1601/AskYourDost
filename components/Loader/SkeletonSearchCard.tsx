import React from "react";
import "./SkeletonSearchCard.css";
import "tailwindcss/tailwind.css";

const SkeletonCard: React.FC = () => {
  return (
    <div className="grid grid-cols-5 gap-3">
      {[...Array(1)].map((_, index) => (
        <div key={index} className="skeleton">
          <div className="skeleton-image"></div>
          <div className="skeleton-details"></div>
          <div className="skeleton-buttons"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCard;
