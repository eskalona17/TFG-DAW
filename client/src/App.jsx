import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SocketContextProvider } from "@/context/SocketContext";
import ScrollToTop from "@/components/scrollToTop/ScrollToTop";
import { AuthContextProvider } from "@/context/AuthContext";
import { PostContextProvider } from "@/context/PostContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ProtectedRoute from "@/utils/ProtectedRoute";
import Layout from "@/components/layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GetPassword from "@/pages/GetPassword";
import EditProfile from "@/pages/EditProfile";
import UserProfile from "@/pages/UserProfile";
import Followers from "@/pages/Followers";
import Followed from "@/pages/Following";
import PostPage from "@/pages/PostPage";
import Messages from "@/pages/Messages";
import Settings from "@/pages/Settings";
import Error404 from "@/pages/Error404";
import Register from "@/pages/Register";
import Explore from "@/pages/Explore";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import "@/variables.css";
import "@/index.css";

export default function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <SocketContextProvider>
          <ThemeProvider>
            <ScrollToTop />
            <PostContextProvider>
              <ToastContainer />
              <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/reset-password/:token"
                  element={<GetPassword />}
                />
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/explora" element={<Explore />} />
                    <Route path="/mensajes" element={<Messages />} />
                    <Route path="/editar-perfil" element={<EditProfile />} />
                    <Route path="/ajustes" element={<Settings />} />
                    <Route path="/:username" element={<UserProfile />} />
                    <Route
                      path="/:username/seguidores"
                      element={<Followers />}
                    />
                    <Route path="/:username/seguidos" element={<Followed />} />
                    <Route
                      path="/:username/post/:postId"
                      element={<PostPage />}
                    />
                  </Route>
                  <Route path="*" element={<Error404 />} />
                </Route>
              </Routes>
            </PostContextProvider>
          </ThemeProvider>
        </SocketContextProvider>
      </BrowserRouter>
    </AuthContextProvider>
  );
}
