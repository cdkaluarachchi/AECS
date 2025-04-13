import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      try {
        
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUser({ id: decodedToken.userId, role: decodedToken.role, name: decodedToken.name, email: decodedToken.email });
      } catch (error) {
        console.error('Error decoding token:', error);
        logout();
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [token]);

  const login = (newToken, userData) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};