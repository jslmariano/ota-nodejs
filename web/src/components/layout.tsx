import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.css";
import "@/styles/general.css";
import "@/styles/navbar-fixed.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <main className="container d-flex flex-column gap-5">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
