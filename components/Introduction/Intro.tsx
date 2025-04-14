import React from "react";
import Link from "next/link";

const Intro = () => {
  return (
    <section className="bg-gradient-to-br from-white via-gray-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Section Title */}
            <div className="inline-flex items-center space-x-2">
              <div className="h-1 w-6 bg-[#e3a62f] rounded-full" />
              <h2 className="text-3xl font-bold">
                Welcome to{" "}
                <span className="inline-flex items-center">
                  <span className="text-[#e3a62f]">Ask</span>
                  <span className="text-[#5c941d]">Your</span>
                  <span className="text-[#0cc0df]">Dost</span>
                </span>
              </h2>
              <div className="h-1 w-6 bg-[#0cc0df] rounded-full" />
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                Your trusted platform for discovering local services and businesses. We connect you with the best products and services available in your locality, making it easier to find exactly what you need.
              </p>

              <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Are you a business owner?
                </h3>
                <p className="text-gray-600">
                  List your business with us and reach thousands of potential customers in your area. It's quick, easy, and{" "}
                  <span className="font-semibold text-[#5c941d]">completely free!</span>
                </p>
                <Link 
                  href="/freeListing"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#5c941d] to-[#4a7718] text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span>Start Free Listing</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[#e3a62f]/10 rounded-lg">
                      <svg className="w-6 h-6 text-[#e3a62f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-800">Local Services</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[#0cc0df]/10 rounded-lg">
                      <svg className="w-6 h-6 text-[#0cc0df]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-800">Verified Listings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#e3a62f]/5 via-[#5c941d]/5 to-[#0cc0df]/5 rounded-3xl transform rotate-3" />
            <div className="relative transform -rotate-3">
              <img
                src="/images/intro-image.png"
                alt="AskYourDost Platform Illustration"
                className="w-full h-auto rounded-3xl shadow-lg"
              />
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#e3a62f]/10 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#0cc0df]/10 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
