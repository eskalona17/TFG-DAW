import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./variables.css";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </BrowserRouter>
  );
}
