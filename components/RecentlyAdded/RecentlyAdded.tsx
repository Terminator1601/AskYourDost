import React, { useState, useEffect } from "react";
import Cards from "../Cards/HomepageCards";
import { db } from "../../database/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import SkeletonCard from "../Loader/SkeletonCard";

interface Listing {
  id: string;
  name: string;
  shopImage: string;
  description: string;
  timestamp: number;
  email: string;
  services: string;
}

const RecentlyAdded = () => {
  const [freeListings, setFreeListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const freeListingsCollection = collection(db, "ApprovedListing");
        const snapshot = await getDocs(freeListingsCollection);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Listing[];

        const sortedData = data.sort((a, b) => b.timestamp - a.timestamp);
        setFreeListings(sortedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(freeListings.length / itemsPerPage);
  const currentItems = freeListings.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center space-x-2 mb-4">
            <div className="h-1 w-8 bg-[#e3a62f] rounded-full" />
            <h2 className="text-3xl font-bold">
              <span className="text-[#5c941d]">Recently</span>{" "}
              <span className="text-gray-900">Added</span>
            </h2>
            <div className="h-1 w-8 bg-[#0cc0df] rounded-full" />
          </div>
          <p className="text-gray-600 text-center max-w-2xl">
            Discover the latest additions to our growing community of trusted service providers
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <SkeletonCard />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {currentItems.map((item) => (
                <a
                  href={`/Details?name=${encodeURIComponent(
                    item.name || ""
                  )}&email=${encodeURIComponent(
                    item.email || ""
                  )}&service=${encodeURIComponent(item.services || "")}`}
                  key={item.id}
                  className="transform transition-all duration-300"
                >
                  <Cards
                    title={item.name}
                    imageUrl={item.shopImage}
                    description={item.description}
                  />
                </a>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center space-x-4">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentPage === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-[#5c941d] hover:bg-[#5c941d] hover:text-white shadow-sm hover:shadow-md"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Previous</span>
                </button>

                <div className="flex items-center space-x-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={`w-8 h-8 rounded-full transition-all duration-200 ${
                        currentPage === index
                          ? "bg-[#5c941d] text-white"
                          : "bg-white text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages - 1}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentPage === totalPages - 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-[#5c941d] hover:bg-[#5c941d] hover:text-white shadow-sm hover:shadow-md"
                  }`}
                >
                  <span>Next</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default RecentlyAdded;
