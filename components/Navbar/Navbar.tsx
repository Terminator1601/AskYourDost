import React from "react";

const NavItem = ({ icon, text }) => (
  <div className="grid grid-cols-2 py-2 px-1 flex-auto items-center">
    <a href="">
      <img src={icon} alt={text} className="w-8" />
      {text}
    </a>
  </div>
);

const Navbar = () => {
  const navItems = [
    { icon: "path-to-icon", text: "Hotels" },
    { icon: "path-to-icon", text: "Restaurants" },
    { icon: "path-to-icon", text: "Spa" },
    { icon: "path-to-icon", text: "Gym" },
    { icon: "path-to-icon", text: "Consultant" },
    { icon: "path-to-icon", text: "Coaching" },
  ];

  return (
    <div className="grid grid-cols-6 flex-auto justify-center text-center">
      {navItems.map((item, index) => (
        <NavItem key={index} {...item} />
      ))}
    </div>
  );
};

export default Navbar;
