"use client";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import PopularSearches from "../components/PopularSearches/PopularSearches";
import RecentlyAdded from "../components/RecentlyAdded/RecentlyAdded";
import FloatingWidgets from "../components/floatingWidget/FloatingWidget";
import Footer from "../components/Footer/Footer";
import Services from "../components/Services/Services";
import Intro from "../components/Introduction/Intro";
// import { BrowserRouter as Router } from "react-router-dom";

export default function Home() {
  return (
    <>
      <main className="sm:mx-20 md:px-16 md:py-0 lg:px-16 lg:py-0  bg-white">
        <Header />
        <hr />
        <Navbar />
        <FloatingWidgets />
        <PopularSearches />
        <RecentlyAdded />
        {/* <UserLocationPopup/> */}
        {/* <UserData /> */}
        <Intro />
        <Services />
      </main>
      <Footer />
    </>
  );
}
