import React from "react";
import Link from "next/link"; // Import Link from next/link
import { navItems } from "../../app/MainData";

interface NavItemProps {
  icon: string;
  text: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text }) => (
  <div className="text-center items-center">
    <Link href={`/SearchResults?query=${encodeURIComponent(text)}`}>
      <div className="text-center items-center flex">
        <img
          src={icon}
          alt={text}
          className="w-7 py-2 text-center items-center"
        />
        {text}
      </div>
    </Link>
  </div>
);

const Navbar = () => {
  return (
    <div className="text-center justify-center items-center grid grid-cols-1 md:grid-cols-6  px-2 lg:flex lg:flex-row lg:justify-between">
      {navItems.map((item, index) => (
        <NavItem key={index} {...item} />
      ))}
    </div>
  );
};

export default Navbar;
