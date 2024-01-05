import React from "react";
import Link from "next/link"; // Import Link from next/link
import { navItems } from "../../app/MainData";

interface NavItemProps {
  icon: string;
  text: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text }) => (
  <div className="flex-auto items-center text-center ">
    <Link href={`/SearchResults?query=${encodeURIComponent(text)}`}>
      <img src={icon} alt={text} className="w-8" />
      {text}
    </Link>
  </div>
);

const Navbar = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 px-2 lg:flex lg:flex-row lg:justify-between">
      {navItems.map((item, index) => (
        <NavItem key={index} {...item} />
      ))}
      {/* <Login /> */}
    </div>
  );
};

export default Navbar;
