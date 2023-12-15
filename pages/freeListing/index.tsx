import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import FloatingWidgets from "@/components/floatingWidget/FloatingWidget";
import Footer from "@/components/Footer/Footer";
import Services from "@/components/Services/Services";
import "tailwindcss/tailwind.css";
import "@/app/globals.css";
import FreeListingForm from "@/components/FreeListingForm/FreeListingForm";

const index = () => {
  return (
    <>
      <main className="sm:mx-20 md:px-16 md:py-0 lg:px-16 lg:py-0  bg-white">
        <Header />
        <hr />
        <Navbar />
        <FloatingWidgets />
        <Services />
        <FreeListingForm/>
      </main>
      <Footer />
    </>
  );
};

export default index;
