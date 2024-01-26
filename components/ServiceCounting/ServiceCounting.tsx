import React from "react";
import { db } from "./../../database/firebaseConfig";
import { collection, getDocs } from "firebase/firestore"; // Add this import

interface ServiceCountingProps {
  pendingUpdatesCount?: number;
}

const ServiceCounting: React.FC<ServiceCountingProps> = ({
  pendingUpdatesCount,
}) => {
  return (
    <>
      <div>StatusUpdates</div>
      <div className="grid grid-cols-3 text-center">
        <div>
          <div>Number of pending Updates: {pendingUpdatesCount}</div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  try {
    const freeListingsCollection = collection(db, "FreeListing");

    const [freeListingsSnapshot] = await Promise.all([
      getDocs(freeListingsCollection),
    ]);

    // Handle the case where freeListingsSnapshot is undefined or null
    const pendingUpdatesCount = freeListingsSnapshot
      ? freeListingsSnapshot.size
      : 0;

    return {
      props: {
        pendingUpdatesCount,
      },
    };
  } catch (error) {
    console.error("Error fetching data from Firestore: ", error);

    return {
      props: {
        pendingUpdatesCount: 0,
      },
    };
  }
};

export default ServiceCounting;
