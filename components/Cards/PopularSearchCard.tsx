import React from 'react'
import "../../app/globals.css"
import "./localCSS.css"

interface PopularSearchCardProps {
  title: string;
  imageUrl: string;
}

const PopularSearchCard: React.FC<PopularSearchCardProps> = ({ title, imageUrl }) => {
  return (
    <div className="relative overflow-hidden bg-white rounded-2xl shadow-sm transition-all duration-300 group-hover:shadow-xl">
      <div className="p-4">
        {/* Image Container */}
        <div className="relative w-full pt-[100%] rounded-xl overflow-hidden mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-[#e3a62f]/10 to-[#5c941d]/10" />
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Title */}
        <div className="relative">
          <div className="bg-gradient-to-r from-[#e3a62f] to-[#5c941d] p-[1px] rounded-lg">
            <div className="bg-white rounded-lg">
              <h2 className="py-2 px-4 text-center font-medium text-gray-800 group-hover:text-[#5c941d] transition-colors duration-300 truncate">
                {title}
              </h2>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#0cc0df] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-[#e3a62f] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};

export default PopularSearchCard;