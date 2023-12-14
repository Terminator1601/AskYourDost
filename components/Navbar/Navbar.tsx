import React from "react";
import { navItems } from "@/app/MainData";

const NavItem = ({ icon, text }) => (
  <div className="grid grid-cols-2 py-2 px-1 flex-auto items-center">
    <a href="">
      <img src={icon} alt={text} className="w-8" />
      {text}
    </a>
  </div>
);

const Navbar = () => {
  

  return (
    <div className="grid grid-cols-6 flex-auto justify-center text-center">
      {navItems.map((item, index) => (
        <NavItem key={index} {...item} />
      ))}
    </div>
  );
};

export default Navbar;
