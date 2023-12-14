import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="mx-20 px-16 py-0 bg-white">
      <Header/>
      <hr/>
      <Navbar/>

    </main>
  );
}
