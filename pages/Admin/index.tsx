import React from "react";
import { UserProvider } from "@/database/User/UserContext";
import "tailwindcss/tailwind.css";
import Header from "@/components/Header/Header";
import StatusUpdates, { getServerSideProps as getStatusUpdatesProps } from "@/components/Admin/StatusUpdates";

const Index = ({ pendingUpdatesCount }) => {
  return (
    <UserProvider>
      <Header />
      <StatusUpdates pendingUpdatesCount={pendingUpdatesCount} />
    </UserProvider>
  );
};

export const getServerSideProps = async (context) => {
  const statusUpdatesProps = await getStatusUpdatesProps(context);
  return {
    props: {
      ...statusUpdatesProps.props,
    },
  };
};

export default Index;
