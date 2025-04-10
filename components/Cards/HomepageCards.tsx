// Cards.jsx

import React from "react";

interface CardsProps {
  title: string;
  imageUrl: string;
  description: string;
}

const Cards: React.FC<CardsProps> = ({ title, imageUrl, description }) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6 text-center">
        <div className="mb-6 relative">
          <div className="w-48 h-48 mx-auto relative">
            <div className="absolute inset-0 bg-[#0cc0df] opacity-0 group-hover:opacity-5 rounded-full transition-opacity duration-300"></div>
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-[#5c941d] transition-colors">
          {title}
        </h2>
        
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Cards;
