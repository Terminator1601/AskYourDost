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
  pendingUpdatesCount,
  countForApproved, // Make sure countForApproved is included in the props
}) => {
  return (
    <>
      <div>StatusUpdates</div>
      <div className="grid grid-cols-3 text-center">
        <div>
          <div>
            Number of pending Updates: {pendingUpdatesCount}
            <CardsForAdmin />
          </div>
        </div>
        <div>
          <div>
           List of Approved : {countForApproved}{" "}
            {/* Ensure countForApproved is used here */}
            <ApprovedCards />
          </div>
        </div>
        <div>hello</div>
      </div>
    </>
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
        countForApproved, // Ensure countForApproved is included in the props
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
