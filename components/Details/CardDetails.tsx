// import React, { useEffect, useState } from "react";
// import { db } from "../../database/firebaseConfig";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import "tailwindcss/tailwind.css";

// interface Listing {
//   id: string;
//   name?: string;
//   shopImage?: string;
//   description?: string;
//   services?: string;
//   email?: string;
//   phone?: string;
// }

// const CardDetails = () => {
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [freeListings, setFreeListings] = useState<Listing[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     const queryFromUrl = new URLSearchParams(window.location.search).get(
//       "query"
//     );
//     setSearchQuery(queryFromUrl || "");
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const freeListingsCollection = collection(db, "FreeListing");
//         const q = query(
//           freeListingsCollection,
//           where("name", "==", searchQuery)
//         );
//         const snapshot = await getDocs(q);
//         const data = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         })) as Listing[];

//         setFreeListings(data);
//       } catch (error) {
//         console.error("Error fetching data from Firestore: ", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (searchQuery) {
//       fetchData();
//     }
//   }, [searchQuery]);

//   return freeListings.map((listing) => (
//     <>
//       <div className="grid grid-cols-2 p-8 justify-center text-left">
//         <div className=" text-right">
//           <img src={listing.shopImage} className="w-64 h-64 max-h-full"></img>
//         </div>
//         <div key={listing.id}>
//           <h1>Name: {listing.name}</h1>
//           <h1>Email: {listing.email}</h1>
//           <h1>Description: {listing.description}</h1>
//           <h1>Phone no: {listing.phone}</h1>
//           <h1>Services: {listing.services}</h1>
//           <button type="button" className=""></button>
//         </div>
//       </div>
//       <hr />
//       <div>
//         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam
//         vero iusto neque non voluptate magni consequatur nemo qui quae nostrum
//         possimus veritatis, dolores odio magnam eum totam est aut aspernatur!
//       </div>
//     </>
//   ));
// };

// export default CardDetails;



import React, { useEffect, useState } from "react";
import { db } from "../../database/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import "tailwindcss/tailwind.css";

interface Listing {
  id: string;
  name?: string;
  shopImage?: string;
  description?: string;
  services?: string;
  email?: string;
  phone?: string;
}

const CardDetails = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [freeListings, setFreeListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const queryFromUrl = new URLSearchParams(window.location.search).get(
      "query"
    );
    setSearchQuery(queryFromUrl || "");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const freeListingsCollection = collection(db, "FreeListing");
        const q = query(
          freeListingsCollection,
          where("name", "==", searchQuery)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Listing[];

        setFreeListings(data);
      } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery]);

  return freeListings.map((listing) => (
    <div key={listing.id}>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 p-8 justify-center text-left">
        <div className="text-right">
          <img src={listing.shopImage} className="w-64 h-64 max-h-full" alt="Shop Image"></img>
        </div>
        <div className="lg:col-span-3">
          <h1>Name: {listing.name}</h1>
          <h1>Email: {listing.email}</h1>
          <h1>Description: {listing.description}</h1>
          <h1>Phone no: {listing.phone}</h1>
          <h1>Services: {listing.services}</h1>
          <div className="flex space-x-4">
            <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded">
              Book Now
            </button>
            <button type="button" className="bg-green-500 text-white px-4 py-2 rounded">
              Contact Us
            </button>
          </div>
        </div>
      </div>
      <hr />
      
    </div>
  ));
};

export default CardDetails;
