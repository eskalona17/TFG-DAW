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

export default function App () {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <SocketContextProvider>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<GetPassword />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='/explora' element={<Explore />} />
                <Route path='/mensajes' element={<Messages />} />
                <Route path='/editar-perfil' element={<EditProfile />} />
                <Route path='/ajustes' element={<Settings />} />
                {/* <Route path='/:username' element={<UserProfile />} /> */}
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
