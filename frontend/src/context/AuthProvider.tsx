import React, { createContext, useState } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  setAuthenticatedStatus: (status: boolean) => void;
}>({
  isAuthenticated: false,
  setAuthenticatedStatus: () => {},
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuthenticatedStatus = (status: boolean) => {
    setIsAuthenticated(status);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticatedStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
