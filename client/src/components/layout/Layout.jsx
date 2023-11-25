import { Outlet, useNavigate } from "react-router-dom";
import Header from "../header/Header"
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import Suggestions from "../suggestions/Suggestions";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import CurrentUser from '../currentUser/CurrentUser';

const Layout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Header />
      <CurrentUser />
      <Navbar />
      <Outlet />
      <Suggestions />
      <Footer />
    </>
  );
};

export default Layout