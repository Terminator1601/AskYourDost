// Cards.jsx

import React from "react";

interface CardsProps {
  title: string;
  imageUrl: string;
  description: string;
}

const Cards: React.FC<CardsProps> = ({ title, imageUrl, description }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Card Header with Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#e3a62f]/5 to-[#5c941d]/5">
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-110"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#5c941d]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Title with Gradient Border */}
        <div className="relative mb-4">
          <div className="bg-gradient-to-r from-[#e3a62f] to-[#5c941d] p-[1px] rounded-lg">
            <div className="bg-white rounded-lg">
              <h2 className="py-2 px-4 text-center font-semibold text-gray-800 group-hover:text-[#5c941d] transition-colors duration-300 truncate">
                {title}
              </h2>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed text-sm line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>

        {/* Decorative Elements */}
        <div className="mt-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="h-1 w-12 bg-gradient-to-r from-[#e3a62f] to-[#5c941d] rounded-full" />
          <div className="w-2 h-2 rounded-full bg-[#0cc0df]" />
        </div>
      </div>
    </div>
  );
};

export default Cards;
