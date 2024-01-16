import BannerCookies from "@/components/bannerCookies/BannerCookies";
import CurrentUser from '@/components/currentUser/CurrentUser';
import Suggestions from "@/components/suggestions/Suggestions";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router-dom";

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