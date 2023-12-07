import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

const ProtectedRoute = () => {
  const { currentUser } = useContext(AuthContext)
  
  return currentUser
   ? <Outlet />
   : <Navigate to="/login" />
}

export default ProtectedRoute