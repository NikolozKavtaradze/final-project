import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  if(localStorage.getItem('isAuthenticated') === null){
    localStorage.setItem('isAuthenticated', 'false');
  }
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuthenticated') === 'true');

  const login = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuth(true);
  }
  const logout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    setIsAuth(false);
  }

  console.log(isAuth);

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);