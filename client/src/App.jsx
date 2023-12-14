import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext";
import { SocketContextProvider } from "./context/SocketContext";
import "./variables.css";
import "./index.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GetPassword from "./pages/GetPassword";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Messages from "./pages/Messages";
import EditProfile from "./pages/EditProfile";
import Settings from "./pages/Settings";
import Error404 from "./pages/Error404";
import ProtectedRoute from "./utils/ProtectedRoute";
import UserProfile from "./components/userProfile/UserProfile";
import { useEffect, useState } from "react";

export default function App () {

  // the theme is saved in the local storage in order to change it in the settings page
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <SocketContextProvider>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password/:token" element={<GetPassword />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='/explora' element={<Explore />} />
                <Route path='/mensajes' element={<Messages />} />
                <Route path='/editar-perfil' element={<EditProfile />} />
                <Route path='/ajustes' element={<Settings toggleTheme={toggleTheme} theme={theme} />} />
                <Route path='/:username' element={<UserProfile />} />
                {/* <Route path='/:username/post/:postId' element={<PostPage />} /> */}
              </Route>
              <Route path="*" element={<Error404 />} />
            </Route>
          </Routes>
        </SocketContextProvider>
      </BrowserRouter>
    </AuthContextProvider>
  );
}
