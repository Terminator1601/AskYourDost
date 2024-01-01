// "use client"
import React from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import FloatingWidgets from "../../components/floatingWidget/FloatingWidget";
import Footer from "../../components/Footer/Footer";
import "tailwindcss/tailwind.css";
import "../../app/globals.css";
import { UserProvider } from "../../database/User/UserContext";
import SearchHeading from "../../components/SearchBox/SearchHeading";
import SearchPageBody from "../../components/SearchPageBody/SearchPageBody";


const Index = () => {
  return (
    <UserProvider>
      <main className="sm:mx-20 md:px-16 md:py-0 lg:px-16 lg:py-0 bg-white">
        <Header />
        <hr />
        {/* <Navbar /> */}
        <FloatingWidgets />
        <SearchHeading />
        <SearchPageBody />
      </main>
      <Footer />
    </UserProvider>
  );
};

export default Index;
