import { Outlet } from "react-router-dom";
import Header from "../header/Header"
import User from "../user/User"
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

const Layout = () => {
  return (
    <>
      <Header />
      <User />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout