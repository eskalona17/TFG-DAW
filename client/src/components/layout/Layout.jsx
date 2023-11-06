import { Outlet } from "react-router-dom";
import Header from "../header/Header"
import Aside from "../aside/Aside"
import Footer from "../footer/Footer";

const Layout = () => {
  return (
    <div>
      <Header />
      <Aside />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout