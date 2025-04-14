import React from "react";
import ServicesCard from "./ServicesCard";
import { ServicesData } from "../../app/MainData";

const Services = () => {
  return (
    <section className="bg-gradient-to-br from-white via-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center space-x-2 mb-4">
            <div className="h-1 w-8 bg-[#e3a62f] rounded-full" />
            <h2 className="text-3xl font-bold">
              <span className="text-gray-900">Our</span>{" "}
              <span className="text-[#5c941d]">Services</span>
            </h2>
            <div className="h-1 w-8 bg-[#0cc0df] rounded-full" />
          </div>
          <p className="text-gray-600 text-center max-w-2xl">
            Explore our comprehensive range of services designed to meet your local needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {ServicesData.map((item, index) => (
            <a
              href="/Services"
              key={index}
              className="transform transition-all duration-300 hover:-translate-y-1"
            >
              <ServicesCard imageUrl={item.imageUrl} title={item.title} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
