

import React from "react";
import { db } from "@/database/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

interface StatusUpdatesProps {
  pendingUpdatesCount: number;
}

const StatusUpdates: React.FC<StatusUpdatesProps> = ({ pendingUpdatesCount }) => {
  return (
    <>
      <div>StatusUpdates</div>
      <div className="grid grid-cols-3 text-center">
        <div>Number of pending Updates: {pendingUpdatesCount}</div>
        <div>hello</div>
        <div>hello</div>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  try {
    const freeListingsCollection = collection(db, "FreeListing");
    const snapshot = await getDocs(freeListingsCollection);
    const count = snapshot.size; // Get the number of documents in the collection

    return {
      props: {
        pendingUpdatesCount: count,
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

export default StatusUpdates;
