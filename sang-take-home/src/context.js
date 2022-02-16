import React, { useContext } from 'react';
import data from './data.json';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  

  return <AppContext.Provider>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
