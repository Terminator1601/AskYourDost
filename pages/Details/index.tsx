"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import "tailwindcss/tailwind.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Loader from "@/components/Loader/Loader";
import "../../app/globals.css";
import CardDetails from "@/components/Details/CardDetails";
import { UserProvider } from "@/database/User/UserContext";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate fetching data
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Reduced delay for better UX
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <UserProvider>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader />
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50">
          <div className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="max-w-7xl mx-auto">
              <Header />
              <hr className="border-gray-200" />
              <Navbar />
            </div>
          </div>

          <main className="max-w-7xl mx-auto">
            <CardDetails />
          </main>

          <Footer />
        </div>
      )}
    </UserProvider>
  );
};

export default Index;
