import { createContext, useContext, useEffect, useState } from 'react';
import API from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('clinicToken'));
  const [loading, setLoading] = useState(true);

  const login = (userData, authToken) => {
    localStorage.setItem('clinicToken', authToken);
    localStorage.setItem('clinicUser', JSON.stringify(userData));

    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    localStorage.removeItem('clinicToken');
    localStorage.removeItem('clinicUser');

    setUser(null);
    setToken(null);
  };

  const fetchMe = async () => {
    try {
      const res = await API.get('/auth/me');
      setUser(res.data.data?.user || res.data.user || res.data.data);
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('clinicUser');

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      fetchMe();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token && !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
