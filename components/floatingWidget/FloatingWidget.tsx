// FloatingWidgets.jsx

import React from "react";
import "./FloatingWidgets.css"; // Import the CSS file for styling

const FloatingWidgets = () => {
  return (
    <div className="floating-widgets">
      <a href="/">
        <div className="widget" style={{ backgroundColor: "var(--orange)" }}>
          Free Listing
        </div>
      </a>
      <a href="/">
        <div className="widget" style={{ backgroundColor: "var(--green)" }}>
          Contact Us
        </div>
      </a>
      {/* Add more widgets as needed */}
    </div>
  );
};

export default FloatingWidgets;
