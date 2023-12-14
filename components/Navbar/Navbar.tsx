// import stylesheet from

import React from "react";

const Navbar = () => {
  return (
    <>
      <div className=" grid grid-cols-6 flex-auto justify-center text-center">
        <div className="grid grid-cols-2 py-0 flex-auto">
          <span className="material-symbols-outlined"></span>
          <a href="">Hotels</a>
        </div>
        <div className="grid grid-cols-2 py-2 px-1 flex-auto">
          <img src="" alt="1" srcset="" className="w-8" />

          <a href="">Restaurants</a>
        </div>
        <div className="grid grid-cols-2 py-2 px-1 flex-auto">
          <img src="" alt="1" srcset="" className="w-8" />

          <a href="">Spa</a>
        </div>
        <div className="grid grid-cols-2 py-2 px-1 flex-auto">
          <img src="" alt="1" srcset="" className="w-8" />

          <a href="">Gym</a>
        </div>
        <div className="grid grid-cols-2 py-2 px-1 flex-auto">
          <img src="" alt="1" srcset="" className="w-8" />

          <a href="">Consultant</a>
        </div>
        <div className="grid grid-cols-2 py-2 px-1 flex-auto">
          <img src="" alt="1" srcset="" className="w-8" />

          <a href="">Coaching</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
