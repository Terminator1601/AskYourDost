import React from 'react'
import "../../app/globals.css"
import "./localCSS.css"

interface PopularSearchCardProps {
    title: string;
    imageUrl: string;
    // description: string;
  }
  

  const PopularSearchCard: React.FC<PopularSearchCardProps> = ({ title, imageUrl }) => {
    return (
      <>
        <div className="text-center border border-amber-400	rounded-full ">
          <img
            src={imageUrl}
            alt={title}
            className=" w-32 h-32 mx-auto d-block object-contain rounded-full"
          />
          <h2 className='p-2 rounded-full ' style={{background: "var(--orange)" }}>{title}</h2>
          {/* <p>{description}</p> */}
        </div>
      </>
    );
  };

export default PopularSearchCard