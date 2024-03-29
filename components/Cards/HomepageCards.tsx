// Cards.jsx

import React from "react";

interface CardsProps {
  title: string;
  imageUrl: string;
  description: string;
}

const Cards: React.FC<CardsProps> = ({ title, imageUrl, description }) => {
  return (
    <>
      <div className="text-center hover:shadow-xl	 ">
        <img
          src={imageUrl}
          alt={title}
          className=" w-48 h-48 mx-auto d-block object-contain"
        />
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </>
  );
};

export default Cards;
