import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [hospitalUser, setHospitalUser] = useState(null);

  useEffect(() => {
    // Check localStorage for existing auth data
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      const storedAdmin = localStorage.getItem('adminUser');
      const storedHospital = localStorage.getItem('hospitalUser');

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedAdmin) setAdminUser(JSON.parse(storedAdmin));
      if (storedHospital) setHospitalUser(JSON.parse(storedHospital));

      setLoading(false);
    };

    checkAuth();
  }, []);

  const value = {
    loading,
    user,
    setUser,
    adminUser,
    setAdminUser,
    hospitalUser,
    setHospitalUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 