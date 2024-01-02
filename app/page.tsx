"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import PopularSearches from "../components/PopularSearches/PopularSearches";
import RecentlyAdded from "../components/RecentlyAdded/RecentlyAdded";
import FloatingWidgets from "../components/floatingWidget/FloatingWidget";
import Footer from "../components/Footer/Footer";
import Services from "../components/Services/Services";
import Intro from "../components/Introduction/Intro";
import Loader from "@/components/Loader/Loader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate fetching data
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating a delay
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <body>
          <main className="sm:mx-20 md:px-16 md:py-0 lg:px-16 lg:py-0  bg-white">
            <Header />
            <hr />
            <Navbar />
            <FloatingWidgets />
            <PopularSearches />
            <RecentlyAdded />
            <Intro />
            <Services />
          </main>
          <Footer />
        </body>
      )}
    </>
  );
}
