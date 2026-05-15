import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [usersDb, setUsersDb] = useState(() => {
    const saved = localStorage.getItem('usersDb');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('usersDb', JSON.stringify(usersDb));
  }, [usersDb]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const signup = (name, email, password) => {
    if (usersDb.some(u => u.email === email)) {
      throw new Error('User with this email already exists');
    }
    const newUser = { id: Date.now().toString(), name, email, password };
    setUsersDb([...usersDb, newUser]);
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email });
    return true;
  };

  const login = (email, password) => {
    const foundUser = usersDb.find(u => u.email === email && u.password === password);
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }
    setUser({ id: foundUser.id, name: foundUser.name, email: foundUser.email });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
