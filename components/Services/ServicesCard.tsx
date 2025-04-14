// ServicesCard.tsx

import React from "react";

interface ServiceCardProps {
  title: string;
  imageUrl: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, imageUrl }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Card Content */}
      <div className="relative p-6">
        {/* Image Container */}
        <div className="relative mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-[#e3a62f]/5 via-[#5c941d]/5 to-[#0cc0df]/5">
          <div className="aspect-square relative">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-110"
            />
            {/* Decorative Elements */}
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-[#e3a62f]/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-[#0cc0df]/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#5c941d] transition-colors duration-300">
            {title}
          </h3>
          {/* Decorative Line */}
          <div className="mt-2 mx-auto w-12 h-1 bg-gradient-to-r from-[#e3a62f] via-[#5c941d] to-[#0cc0df] rounded-full transform origin-left transition-all duration-300 group-hover:w-24" />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
