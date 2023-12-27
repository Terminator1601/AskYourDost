import { UserProvider } from "../../database/User/UserContext";
import "tailwindcss/tailwind.css";
import Header from "../../components/Header/Header";
import StatusUpdates, {
  getServerSideProps as getStatusUpdatesProps,
} from "../../components/Admin/PendingUpdate/StatusUpdates";
import { GetServerSideProps } from "next"; // Import GetServerSideProps

interface IndexProps {
  pendingUpdatesCount: number;
}

const Index: React.FC<IndexProps> = ({ pendingUpdatesCount }) => {
  return (
    <UserProvider>
      <Header />
      <StatusUpdates pendingUpdatesCount={pendingUpdatesCount} />
    </UserProvider>
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
