import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import FloatingWidgets from "../../components/floatingWidget/FloatingWidget";
import Footer from "../../components/Footer/Footer";
import "tailwindcss/tailwind.css";
import "../../app/globals.css";
import SearchHeading from "../../components/SearchBox/SearchHeading";
import SearchPageBody from "../../components/SearchPageBody/SearchPageBody";
import Loader from "@/components/Loader/Loader";
import { UserProvider } from "@/database/User/UserContext";
import Head from "next/head";

const Index = () => {
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
        <>
          <Head>
            <title>Search Results</title>
            <link rel="icon" href="./favicon.ico" />
          </Head>
          <main className="sm:mx-20 md:px-16 md:py-0 lg:px-16 lg:py-0 bg-white">
            <Header />
            <hr />
            {/* <Navbar /> */}
            <FloatingWidgets />
            <SearchHeading />
            <SearchPageBody />
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default Index;
