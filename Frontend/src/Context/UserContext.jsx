import React, { createContext, useContext, useState } from "react";

// Create Context
export const UserContext = createContext(null);

// Context Provider
const UserContextProvider = ({ children }) => {

  // User is initially not logged in
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access UserContext
export const getData = () => {
  return useContext(UserContext);
};

export default UserContextProvider;