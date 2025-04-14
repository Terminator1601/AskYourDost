import React, { useState } from "react";
import Link from "next/link";
import { navItems } from "../../app/MainData";

interface NavItemProps {
  icon: string;
  text: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text }) => (
  <Link href={`/SearchResults?category=${encodeURIComponent(text)}`}>
    <div className="group p-3 rounded-lg hover:bg-gray-50 transition-all duration-200">
      <div className="flex items-center justify-center space-x-3">
        <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-all duration-200">
          <img src={icon} alt={text} className="w-6 h-6" />
        </div>
        <span className="text-gray-700 group-hover:text-[#5c941d] font-medium">
          {text}
        </span>
      </div>
    </div>
  </Link>
);

const Navbar = () => {
  const [showItems, setShowItems] = useState(false);

  const toggleItems = () => {
    setShowItems(!showItems);
  };

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Toggle */}
        <div className="lg:hidden py-4">
          <button
            onClick={toggleItems}
            className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
            aria-expanded={showItems}
          >
            <span className="text-gray-700 font-medium">Browse Categories</span>
            <svg
              className={`w-5 h-5 text-[#0cc0df] transform transition-transform duration-200 ${
                showItems ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Navigation Grid */}
        <div
          className={`${
            showItems ? "block" : "hidden lg:block"
          } py-4 transition-all duration-200`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {navItems.map((item, index) => (
              <NavItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
