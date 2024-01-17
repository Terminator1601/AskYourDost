import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const ToggleHeadings: React.FC = () => {
  const [showHeadings, setShowHeadings] = useState(false);

  const toggleHeadings = () => {
    setShowHeadings(!showHeadings);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
        onClick={toggleHeadings}
      >
        {showHeadings ? "Hide Headings" : "Show Headings"}
      </button>

      {showHeadings && (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-2">Heading 1</h1>
          <h2 className="text-xl font-bold mb-2">Heading 2</h2>
          <h3 className="text-lg font-bold mb-2">Heading 3</h3>
        </div>
      )}
    </div>
  );
};

export default ToggleHeadings;
