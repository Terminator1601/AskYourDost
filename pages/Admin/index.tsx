import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import Header from "../../components/Header/Header";
import StatusUpdates, {
  getServerSideProps as getStatusUpdatesProps,
} from "../../components/Admin/PendingUpdate/StatusUpdates";
import { GetServerSideProps } from "next"; // Import GetServerSideProps
import Loader from "@/components/Loader/Loader";
import { UserProvider } from "@/database/User/UserContext";

interface IndexProps {
  pendingUpdatesCount: number;
}

const Index: React.FC<IndexProps> = ({ pendingUpdatesCount }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate fetching data
      await getStatusUpdatesProps();
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <StatusUpdates pendingUpdatesCount={pendingUpdatesCount} />
        </>
      )}
    </>
  );
};

// Explicitly define the type for getServerSideProps using GetServerSideProps
export const getServerSideProps: GetServerSideProps<IndexProps> = async () => {
  const statusUpdatesProps = await getStatusUpdatesProps();
  return {
    props: {
      ...statusUpdatesProps.props,
    },
  };
};

export default Index;
