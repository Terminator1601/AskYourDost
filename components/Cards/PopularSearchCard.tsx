import React from 'react'
import "../../app/globals.css"

interface PopularSearchCardProps {
    title: string;
    imageUrl: string;
    // description: string;
  }
  

  const PopularSearchCard: React.FC<PopularSearchCardProps> = ({ title, imageUrl }) => {
    return (
      <>
        <div className="text-center border">
          <img
            src={imageUrl}
            alt={title}
            className=" w-32 h-32 mx-auto d-block object-contain"
          />
          <h2 className='p-2' style={{background: "var(--orange)" }}>{title}</h2>
          {/* <p>{description}</p> */}
        </div>
      </>
    );
  };

export default PopularSearchCard