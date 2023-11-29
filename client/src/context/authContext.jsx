import axios from "axios";
import { createContext, useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) ?? null
  );

  const login = async (inputs) => {
    try {
      const res = await axios.post(`${apiUrl}:1234/api/users/login`, inputs, {
        withCredentials: true,
      });
      const { password, ...userData } = res.data;
      const user = { ...userData };
      setCurrentUser(user);
    } catch (err) {
      console.error("Ocurrió un error en el login: ", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${apiUrl}:1234/api/users/logout`, "",{
        withCredentials: true,
      });
      localStorage.removeItem('user');
      localStorage.removeItem('acceptedCookies');
      setCurrentUser(null);
    } catch (err) {
      console.error('Ocurrió un error al cerrar la sesión: ', err);
      throw err;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${apiUrl}:1234/api/users/user`, { withCredentials: true });
        const { password, ...userData } = res.data;
        const user = { ...userData };
        setCurrentUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const isAuthenticated = () => currentUser !== null;

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
