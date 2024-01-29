// Footer.tsx

import React from "react";
import "tailwindcss/tailwind.css"

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto flex flex-wrap">
        {/* Column 1 - Image */}
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
          <img
            src="/images/favicon.ico" // Replace with the actual path to your image
            alt="Footer Logo"
            className="max-w-full h-auto w-56 text-center"
          />
        </div>

        {/* Column 2 - Useful Links */}
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
          <h2 className="text-lg font-semibold mb-4">Useful Links 1</h2>
          <ul className="list-none p-0 m-0">
            <li className="py-3">
              <a href="/#">Home</a>
            </li>
            <li className="pb-2">
              <a href="/freeListing">FreeListing</a>
            </li>
            <li className="pb-2">
              <a href="/SearchResults?query=Hotels">Hotels</a>
            </li>
            <li className="pb-2">
              <a href="/SearchResults?query=Restaurants">Restaurants</a>
            </li>
            <li className="pb-2">
              <a href="/SearchResults?query=Gym">Gym</a>
            </li>
            <li className="pb-2">
              <a href="/SearchResults?query=Spa">Spa</a>
            </li>
            <li className="pb-2">
              <a href="/SearchResults?query=Consultant">Consultant</a>
            </li>
            <li className="pb-2">
              <a href="/SearchResults?query=Coaching">Coaching</a>
            </li>
          </ul>
        </div>

        {/* Column 3 - Useful Links */}
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
          <h2 className="text-lg font-semibold mb-4">Services Provided</h2>
          <ul className="list-none p-0 m-0">
            <li className="py-3">
              <a href="/Services">Advertisement</a>
            </li>
            <li className="pb-3">
              <a href="/Services">Website Development</a>
            </li>
            <li className="pb-3">
              <a href="/Services">Increase Leads</a>
            </li>
            <li className="pb-3">
              <a href="/Services">Careers</a>
            </li>
          </ul>
        </div>

        {/* Column 4 - Useful Links */}
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
          <h2 className="text-lg font-semibold mb-4">About Us</h2>
          <ul className="list-none p-0 m-0">
            <li className="py-2">
              <a href="/">Our Team</a>
            </li>
            <li className="pb-2">
              <a href="/">Contact Us</a>
            </li>
            {/* Add more links as needed */}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
