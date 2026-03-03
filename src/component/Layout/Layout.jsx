/* eslint-disable no-unused-vars */
import React from "react";
import style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="container py-6 mt-16">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
}
