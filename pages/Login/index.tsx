import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import FloatingWidgets from "@/components/floatingWidget/FloatingWidget";
import Footer from "@/components/Footer/Footer";
import "tailwindcss/tailwind.css";
import "@/app/globals.css";
import SignIn from "@/components/Login&Signup/SignIn";
import { UserProvider } from "@/database/User/UserContext";
import SearchPage from "@/components/SearchBox/SearchPage";


const index = () => {
  return (
    <UserProvider>
      <main className="sm:mx-20 md:px-16 md:py-0 lg:px-16 lg:py-0  bg-white">
        <Header />
        <hr />
        <Navbar />
        <FloatingWidgets />
        <SignIn/>
      </main>
      <SearchPage/>
      <Footer />
    </UserProvider>
  );
};

export default index;
