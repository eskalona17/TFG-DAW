import axios from "axios";
import { createContext, useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) ?? null
  );

  const login = async (inputs) => {
    try {
      const res = await axios.post(`${apiUrl}/api/users/login`, inputs, {
        withCredentials: true,
      });
      const { password, ...userData } = res.data;
      const user = { ...userData };
      localStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);
    } catch (err) {
      console.error("Ocurrió un error en el login: ", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${apiUrl}/api/users/logout`, "",{
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
        setLoading(true);
        const res = await axios.get(`${apiUrl}/api/users/user`, { withCredentials: true });
        const { password, ...userData } = res.data;
        const user = { ...userData };
        setCurrentUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const isAuthenticated = () => currentUser !== null;

  return (
    <AuthContext.Provider value={{ loading, currentUser, setCurrentUser, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
