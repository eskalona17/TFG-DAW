import axios from "axios";
import { createContext, useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) ?? null
  );

  const login = async (inputs) => {
    console.log(inputs);
    try {
      const res = await axios.post(`${apiUrl}:1234/api/users/login`, inputs);
      setCurrentUser(res.data);
    } catch (err) {
      console.error("Ocurrió un error en el login: ", err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null)
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
