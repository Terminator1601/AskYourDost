import React from "react";
import "tailwindcss/tailwind.css";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 bg-white shadow-sm h-screen sticky top-0">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-8">
              <div className="p-2 bg-[#5c941d]/10 rounded-lg">
                <svg className="w-6 h-6 text-[#5c941d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Business Panel</h2>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1">
              <a href="#" className="flex items-center px-4 py-2 text-[#5c941d] bg-[#5c941d]/10 rounded-lg group">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg group">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Listings
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg group">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg group">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>
            <p className="text-gray-600">Here's what's happening with your business today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Total Views */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-[#e3a62f]/10 rounded-lg">
                  <svg className="w-6 h-6 text-[#e3a62f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Total Views</h3>
                  <p className="text-lg font-semibold text-gray-900">2,847</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <span className="text-sm text-green-600 font-medium">↑ 12%</span>
                  <span className="text-sm text-gray-500 ml-2">vs last month</span>
                </div>
              </div>
            </div>

            {/* Active Listings */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-[#5c941d]/10 rounded-lg">
                  <svg className="w-6 h-6 text-[#5c941d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Active Listings</h3>
                  <p className="text-lg font-semibold text-gray-900">12</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <span className="text-sm text-green-600 font-medium">↑ 2</span>
                  <span className="text-sm text-gray-500 ml-2">new this week</span>
                </div>
              </div>
            </div>

            {/* Customer Inquiries */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-[#0cc0df]/10 rounded-lg">
                  <svg className="w-6 h-6 text-[#0cc0df]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Customer Inquiries</h3>
                  <p className="text-lg font-semibold text-gray-900">48</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <span className="text-sm text-green-600 font-medium">92%</span>
                  <span className="text-sm text-gray-500 ml-2">response rate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-2 bg-[#5c941d]/10 rounded-lg">
                      <svg className="w-5 h-5 text-[#5c941d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">New customer inquiry received</p>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
