import React, { createContext, useState } from 'react';

// Create the context
export const DataContext = createContext();

// Create the provider component
export const DataProvider = ({ children }) => {
  const getCartdatas = JSON.parse(localStorage?.getItem("cartdata"));
  const userdata = JSON.parse(localStorage?.getItem("user"));
  const [cartdata, setCartData] = useState(getCartdatas || []); // Shared state
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(userdata || null);
  const token = localStorage.getItem("token");
  return (
    <DataContext.Provider value={{cartdata, setCartData, products,setProducts, user, setUser, token}}>
      {children}
    </DataContext.Provider>
  );
};
