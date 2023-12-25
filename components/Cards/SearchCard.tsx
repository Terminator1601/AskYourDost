import React from "react";
import "tailwindcss/tailwind.css";


const cardData = [
  {
    shopImage: "img1.png",
    name: "Heading 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut autem deleniti mollitia ullam saepe nesciunt aliquam amet quibusdam culpa, similique illum facere laboriosam labore nemo, ipsa soluta nam ipsam reprehenderit?",
  },
  {
    shopImage: "img2.png",
    name: "Heading 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut autem deleniti mollitia ullam saepe nesciunt aliquam amet quibusdam culpa, similique illum facere laboriosam labore nemo, ipsa soluta nam ipsam reprehenderit?",
  },
  
];

const SearchCard = () => {
  return (
    <>
    {cardData.map((card, index) => (
      <div key={index} className="grid grid-cols-5 gap-3">
        <div>
          <img src={card.shopImage} alt={card.shopImage} srcSet="" />
        </div>
        <div className="grid col-span-3">
          <h2>{card.name}</h2>
          <p>{card.description}</p>
        </div>
        <div>
          <button type="button">Show Details</button>
          <button type="button">Contact Us</button>
        </div>
      </div>
    ))}
  </>
  );
};

export default SearchCard;
