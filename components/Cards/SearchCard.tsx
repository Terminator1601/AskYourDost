import React from "react";
import "tailwindcss/tailwind.css";


const cardData = [
  {
    imgAlt: "img1",
    heading: "Heading 1",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut autem deleniti mollitia ullam saepe nesciunt aliquam amet quibusdam culpa, similique illum facere laboriosam labore nemo, ipsa soluta nam ipsam reprehenderit?",
  },
  {
    imgAlt: "img2",
    heading: "Heading 2",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut autem deleniti mollitia ullam saepe nesciunt aliquam amet quibusdam culpa, similique illum facere laboriosam labore nemo, ipsa soluta nam ipsam reprehenderit?",
  },
  
];

const SearchCard = () => {
  return (
    <>
    {cardData.map((card, index) => (
      <div key={index} className="grid grid-cols-5 gap-3">
        <div>
          <img src="" alt={card.imgAlt} srcSet="" />
        </div>
        <div className="grid col-span-3">
          <h2>{card.heading}</h2>
          <p>{card.content}</p>
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
