import React from 'react';
import './SkeletonCard.css'; // Import your component-specific styles

const SkeletonCard: React.FC = () => {
  return (
    <div className="row">
      <div className="container">
        <div className="grid-row grid-4-4">
          {[...Array(6)].map((_, index) => (
            <div className="cards" key={index}>
              <div className="card_image loading"></div>
              <div className="card_title loading"></div>
              <div className="card_description loading"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
