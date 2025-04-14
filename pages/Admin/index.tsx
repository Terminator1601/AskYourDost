import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import StatusUpdates, {
  getServerSideProps as getStatusUpdatesProps,
} from "../../components/Admin/PendingUpdate/StatusUpdates";
import { GetServerSideProps } from "next";
import Loader from "@/components/Loader/Loader";
import { UserProvider } from "@/database/User/UserContext";
import "tailwindcss/tailwind.css";

interface IndexProps {
  pendingUpdatesCount: number;
}

const AdminDashboard: React.FC<IndexProps> = ({ pendingUpdatesCount }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getStatusUpdatesProps();
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <UserProvider>
      {loading ? (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-gray-50 to-white">
          <Header />
          
          {/* Admin Dashboard */}
          <main className="flex-grow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Dashboard Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[#5c941d]/10 rounded-lg">
                      <svg className="w-6 h-6 text-[#5c941d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                  </div>
                  
                  {/* Pending Updates Counter */}
                  <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center space-x-2">
                    <div className="p-1.5 bg-[#e3a62f]/10 rounded-md">
                      <svg className="w-5 h-5 text-[#e3a62f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pending Updates</p>
                      <p className="text-lg font-semibold text-gray-900">{pendingUpdatesCount}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="p-2 bg-[#0cc0df]/10 rounded-lg">
                            <svg className="w-6 h-6 text-[#0cc0df]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                            <dd className="text-lg font-semibold text-gray-900">2.7k</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="p-2 bg-[#5c941d]/10 rounded-lg">
                            <svg className="w-6 h-6 text-[#5c941d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Approved Listings</dt>
                            <dd className="text-lg font-semibold text-gray-900">1.2k</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="p-2 bg-[#e3a62f]/10 rounded-lg">
                            <svg className="w-6 h-6 text-[#e3a62f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Total Views</dt>
                            <dd className="text-lg font-semibold text-gray-900">35.4k</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Updates */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <StatusUpdates pendingUpdatesCount={pendingUpdatesCount} />
              </div>
            </div>
          </main>
        </div>
      )}
    </UserProvider>
  );
};

export const getServerSideProps: GetServerSideProps<IndexProps> = async () => {
  const statusUpdatesProps = await getStatusUpdatesProps();
  return {
    props: {
      ...statusUpdatesProps.props,
    },
  };
};

export default AdminDashboard;
