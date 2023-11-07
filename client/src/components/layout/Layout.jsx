import { Outlet } from "react-router-dom";
import Header from "../header/Header"
import User from "../user/User"
import Footer from "../footer/Footer";

const Layout = () => {
  return (
    <div>
      <Header />
      <User />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout