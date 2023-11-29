import { Outlet, useNavigate } from "react-router-dom";
import Header from "../header/Header"
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import Suggestions from "../suggestions/Suggestions";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import CurrentUser from '../currentUser/CurrentUser';
import BannerCookies from "../bannerCookies/BannerCookies";

const Layout = () => {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !isAuthenticated()) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);

  return (
    <>
      <Header />
      <CurrentUser />
      <Navbar />
      <Outlet />
      <Suggestions />
      <Footer />
      <BannerCookies />
    </>
  );
};

export default Layout