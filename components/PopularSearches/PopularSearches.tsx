import React, { useState, useEffect } from "react";
import PopularSearchCard from "../Cards/PopularSearchCard";
import { popularSectionData } from "../../app/MainData";
import "tailwindcss/tailwind.css";
import SkeletonCard from "../Loader/SkeletonCard";

const PopularSearches = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            <span className="text-[#e3a62f]">Popular</span>{" "}
            <span className="text-gray-900">Searches</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the most sought-after services and businesses in your area
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <SkeletonCard />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 lg:gap-8">
            {popularSectionData.map((item, index) => (
              <a
                href={`/SearchResults?category=${encodeURIComponent(
                  item.title || ""
                )}`}
                key={index}
                className="group transform transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative">
                  <PopularSearchCard
                    title={item.title}
                    imageUrl={item.imageUrl}
                  />
                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#5c941d]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Bottom Pattern */}
        <div className="mt-16 flex justify-center">
          <div className="h-1 w-24 bg-gradient-to-r from-[#e3a62f] via-[#5c941d] to-[#0cc0df] rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default PopularSearches;
