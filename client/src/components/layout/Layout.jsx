import { Outlet } from "react-router-dom";
import Header from "@/header/Header"
import Footer from "@/footer/Footer";
import Navbar from "@/navbar/Navbar";
import Suggestions from "@/suggestions/Suggestions";
import CurrentUser from '@/currentUser/CurrentUser';
import BannerCookies from "@/bannerCookies/BannerCookies";

const Layout = () => {
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