import React from "react";
import { navItems } from "@/app/MainData";
import Login from "../Login&Signup/login";

const NavItem = ({ icon, text }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 py-2 px-1 flex-auto  items-center text-center">
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
      <Login/>
    </div>
  );
};

export default Navbar;
