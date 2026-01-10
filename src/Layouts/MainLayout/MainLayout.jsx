import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../../Components/Footer";

const MainLayout = () => {

  // state to tracking scrolling
  const [isScrolled, setIsScrolled] = useState(false);

  // function to set scroll state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // component unmount হলে listener remove
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div className={`sticky top-0 z-50
        transition-all duration-300
        ${isScrolled
          ? "bg-pink-100/40 backdrop-blur-md border border-white/20 shadow-sm"
          : "bg-pink-100"
        }
      `}>
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
