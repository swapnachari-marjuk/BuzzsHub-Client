import React from "react";
import Navbar from "../../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../../Components/Footer";

const MainLayout = () => {
  return (
    <div>
      <div className=" bg-pink-100 sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="min-h-[calc(100vh-296px)] max-w-7xl mx-auto">
        <Outlet />
      </div>
      <footer className="lg:max-w-[50%] md:max-w-[80%] mx-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
