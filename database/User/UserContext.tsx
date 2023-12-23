"use client"
import { createContext, useContext, ReactNode } from "react";
import React from "react";

interface UserContextProps {
  username: string;
  email: string;
  phone: string;
  updateUser: (userData: UserData) => void;
}

interface UserData {
  username: string;
  email: string;
  phone: string;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = React.useState<UserData>({
    username: "",
    email: "",
    phone: "",
  });

  const updateUser = (newUserData: UserData) => {
    setUserData(newUserData);
  };

  return (
    <UserContext.Provider value={{ ...userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
