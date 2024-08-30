import React from 'react'
import { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({ isLogged: false, role: '' });

  const auth = async (token) => {
    localStorage.setItem('token', token);
    try {
      const response = await axios.get('http://localhost:3000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUser({ isLogged: true, role: response.data.user.role });
    } catch (err) {
      console.log(err);
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    setUser({ isLogged: false, role: ''})
  }
  
  return (
    <AuthContext.Provider value={{ user, auth, logout }}>
      {children}
    </AuthContext.Provider>
  )
}



