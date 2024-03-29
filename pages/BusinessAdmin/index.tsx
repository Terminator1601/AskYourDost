import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import FloatingWidgets from "../../components/floatingWidget/FloatingWidget";
import Footer from "../../components/Footer/Footer";
import "tailwindcss/tailwind.css";
import "../../app/globals.css";
import Loader from "@/components/Loader/Loader";
import ToggleHeadings from "@/pages/BusinessAdmin/Dashboard/ToggleHeadings/ToggleHeadings";
import Dashboard from "./Dashboard/Dashboard/Dashboard";
import { UserProvider } from "@/database/User/UserContext";

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
    <UserProvider>
      {loading ? (
        <Loader />
      ) : (
        <>
          <main className="sm:mx-20 md:px-16 md:py-0 lg:px-16 lg:py-0 bg-white">
            <Header />
            <hr />
            <Navbar />
            <hr />
            <FloatingWidgets />
            {/* <ToggleHeadings/> */}
            <Dashboard />
          </main>
          <Footer />
        </>
      )}
    </UserProvider>
  );
};

export default Index;
