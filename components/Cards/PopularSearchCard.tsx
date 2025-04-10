import React from 'react'
import "../../app/globals.css"
import "./localCSS.css"

interface PopularSearchCardProps {
    title: string;
    imageUrl: string;
}

const PopularSearchCard: React.FC<PopularSearchCardProps> = ({ title, imageUrl }) => {
  return (
    <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
      <div className="relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-lg">
        <div className="p-2">
          <div className="relative w-32 h-32 mx-auto overflow-hidden rounded-full border-4 border-[#e4e4e4] group-hover:border-[#e3a62f] transition-colors">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="mt-2 bg-[#e3a62f] text-white py-2 px-4 rounded-full">
            <h2 className="text-center font-medium truncate">{title}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularSearchCard