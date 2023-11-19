import { Outlet } from "react-router-dom";
import Header from "../header/Header"
import CurrentUser from "../currentUser/CurrentUser"
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import Suggestions from "../suggestions/Suggestions";

const Layout = () => {
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