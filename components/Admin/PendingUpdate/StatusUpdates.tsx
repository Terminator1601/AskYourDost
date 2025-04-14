import React from "react";
import { db } from "../../../database/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import CardsForAdmin from "./cardsForAdmin";
import ApprovedCards from "./ApprovedCards";

interface StatusUpdatesProps {
  pendingUpdatesCount?: number;
  countForApproved?: number;
}

const StatusUpdates: React.FC<StatusUpdatesProps> = ({
  pendingUpdatesCount = 0,
  countForApproved = 0,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2">
          <div className="h-1 w-6 bg-[#e3a62f] rounded-full" />
          <h2 className="text-2xl font-bold text-gray-900">Status Overview</h2>
          <div className="h-1 w-6 bg-[#0cc0df] rounded-full" />
        </div>
      </div>

      {/* Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Pending Updates */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#e3a62f]/10 rounded-lg">
                  <svg className="w-6 h-6 text-[#e3a62f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Pending Updates</h3>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                {pendingUpdatesCount}
              </span>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <CardsForAdmin />
            </div>
          </div>
        </div>

        {/* Approved Listings */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#5c941d]/10 rounded-lg">
                  <svg className="w-6 h-6 text-[#5c941d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Approved Listings</h3>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {countForApproved}
              </span>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <ApprovedCards />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-[#0cc0df]/10 rounded-lg">
                <svg className="w-6 h-6 text-[#0cc0df]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <span className="text-gray-700">Review All Pending</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <span className="text-gray-700">Export Reports</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
              <button className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <span className="text-gray-700">System Settings</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const freeListingsCollection = collection(db, "FreeListing");
    const approvedListingsCollection = collection(db, "ApprovedListing");

    const [freeListingsSnapshot, approvedListingsSnapshot] = await Promise.all([
      getDocs(freeListingsCollection),
      getDocs(approvedListingsCollection),
    ]);

    const pendingUpdatesCount = freeListingsSnapshot.size;
    const countForApproved = approvedListingsSnapshot.size;

    return {
      props: {
        pendingUpdatesCount,
        countForApproved,
      },
    };
  } catch (error) {
    console.error("Error fetching data from Firestore: ", error);
    return {
      props: {
        pendingUpdatesCount: 0,
        countForApproved: 0,
      },
    };
  }
};

export default StatusUpdates;
