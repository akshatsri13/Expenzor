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

  const signup = async (name, email, password) => {
    try {
      const res = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Signup failed');
      }

      const userData = await res.json();
      setUser({ id: userData.id, name: userData.name, email: userData.email });
      return true;
    } catch (err) {
      console.warn("Backend signup failed, falling back to local DB.", err);
      
      // Fallback to local storage if backend is unreachable
      if (usersDb.some(u => u.email === email)) {
        throw new Error('User with this email already exists');
      }
      const newUser = { id: Date.now().toString(), name, email, password };
      setUsersDb(prev => [...prev, newUser]);
      setUser({ id: newUser.id, name: newUser.name, email: newUser.email });
      return true;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Invalid credentials');
      }

      const userData = await res.json();
      setUser({ id: userData.id, name: userData.name, email: userData.email });
      return true;
    } catch (err) {
      console.warn("Backend login failed, falling back to local DB.", err);
      
      // Fallback to local storage if backend is unreachable
      const foundUser = usersDb.find(u => u.email === email && u.password === password);
      if (!foundUser) {
        throw new Error(err.message || 'Invalid email or password');
      }
      setUser({ id: foundUser.id, name: foundUser.name, email: foundUser.email });
      return true;
    }
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
