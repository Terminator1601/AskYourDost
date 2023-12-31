// Cards.jsx

import React from "react";

interface CardsProps {
  title: string;
  imageUrl: string;
//   description: string;
}

const Cards: React.FC<CardsProps> = ({ title, imageUrl }) => {
  return (
    <>
      <div>
        <img src={imageUrl} alt={title} />
        <h2>{title}</h2>
        {/* <p>{description}</p> */}
      </div>
    </>
  );
};

export default Cards;
