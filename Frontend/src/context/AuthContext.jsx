import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('metro-mini-user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('metro-mini-token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('metro-mini-token', token);
    } else {
      localStorage.removeItem('metro-mini-token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('metro-mini-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('metro-mini-user');
    }
  }, [user]);

  // Set auth header for api client
  useEffect(() => {
    if(token) {
      api.defaults.headers.common['Authorization'] = Bearer ${token};
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    AuthContext.Provider value={{ user, setUser, token, setToken, logout }}>
      {children}
    /AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);