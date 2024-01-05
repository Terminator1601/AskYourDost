"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import "tailwindcss/tailwind.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Loader from "@/components/Loader/Loader";
import "../../app/globals.css";
import CardDetails from "@/components/Details/CardDetails";

const Index = () => {
  return (
    <>
      <div style={{ backgroundColor: "var(--grey)" }}>
        <main className="sm:mx-20 md:px-16 md:py-0 lg:px-16 lg:py-0  bg-white">
          <Header />
          <Navbar />
          <CardDetails />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Index;
