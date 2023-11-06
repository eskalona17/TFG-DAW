import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./variables.css";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import './App.css'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-up' element={<Register />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/mensajes' element={<Messages />} /> */}
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          {/* <Route path='/explora' element={<Explore />} /> */}
          {/* <Route path='/editar-perfil' element={<EditProfile />} /> */}
          {/* <Route path='/ajustes' element={<Settings />} /> */}
          {/* <Route path='/:username' element={<UserProfile />} /> */}
          {/* <Route path='/:username/post/:postId' element={<PostPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )

}