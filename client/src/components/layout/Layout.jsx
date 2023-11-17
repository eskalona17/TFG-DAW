import { Outlet } from "react-router-dom";
import Header from "../header/Header"
import User from "../user/User"
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

const Layout = () => {
  return (
    <main>
      <Header />
      <User />
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout