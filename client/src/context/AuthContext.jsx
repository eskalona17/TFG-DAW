import { createContext, useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [profilePic, setProfilePic] = useState(null);
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
        setProfilePic(user.profilePic)
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        if (error.response && error.response.status !== 401) {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ loading, currentUser, profilePic, setCurrentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
