import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import FloatingWidgets from "../../components/floatingWidget/FloatingWidget";
import Footer from "../../components/Footer/Footer";
import Services from "../../components/Services/Services";
import "tailwindcss/tailwind.css";
import "../../app/globals.css";
import FreeListingForm from "../../components/FreeListingForm/FreeListingForm";
import Loader from "@/components/Loader/Loader";
import Cookies from "universal-cookie";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the cookie is present (client-side)
    const cookies = new Cookies();
    const usernameCookie = cookies.get("username");

    setIsLoggedIn(!!usernameCookie); // Set isLoggedIn based on the presence of the username cookie

    const fetchData = async () => {
      // Simulate fetching data
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating a delay
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleLoginRedirect = () => {
    router.push("/Login"); // Redirect to the login page
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <main className="sm:mx-20 md:px-16 md:py-0 lg:px-16 lg:py-0  bg-white">
            <Header />
            <hr />
            <Navbar />
            <FloatingWidgets />
            <Services />
            {isLoggedIn ? (
              <FreeListingForm />
            ) : (
              <div className="text-center">
                <p className="text-red-500 mb-2">
                  Please log in to fill the form.
                </p>
                <button
                  onClick={handleLoginRedirect}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Go to Login
                </button>
              </div>
            )}
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default Index;
