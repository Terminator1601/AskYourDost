// Footer.tsx

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto flex flex-wrap">
        {/* Column 1 - Image */}
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
          <img
            src="/path/to/your/image.png" // Replace with the actual path to your image
            alt="Footer Logo"
            className="max-w-full h-auto"
          />
        </div>

        {/* Column 2 - Useful Links */}
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
          <h2 className="text-lg font-semibold mb-4">Useful Links 1</h2>
          <ul className="list-none p-0 m-0">
            <li>
              <a href="/">Link 1</a>
            </li>
            <li>
              <a href="/">Link 2</a>
            </li>
            {/* Add more links as needed */}
          </ul>
        </div>

        {/* Column 3 - Useful Links */}
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
          <h2 className="text-lg font-semibold mb-4">Useful Links 2</h2>
          <ul className="list-none p-0 m-0">
            <li>
              <a href="/">Link 3</a>
            </li>
            <li>
              <a href="/">Link 4</a>
            </li>
            {/* Add more links as needed */}
          </ul>
        </div>

        {/* Column 4 - Useful Links */}
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
          <h2 className="text-lg font-semibold mb-4">Useful Links 3</h2>
          <ul className="list-none p-0 m-0">
            <li>
              <a href="/">Link 5</a>
            </li>
            <li>
              <a href="/">Link 6</a>
            </li>
            {/* Add more links as needed */}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
