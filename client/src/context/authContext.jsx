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

  // ademas de borrar el user en el localstorage, hay que borrarlo tambien de la cookie y su jwt
  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  useEffect(() => {
     // Check if the user is logged in before updating local storage
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const isAuthenticated = () => currentUser !== null;

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
