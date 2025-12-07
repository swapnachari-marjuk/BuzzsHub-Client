import React from "react";
import logo from "../assets/BuzzsH_logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className="md:-ml-5 lg:ml-0 flex justify-center items-center group">
        <img className="md:w-20 w-16" src={logo} alt="" />
        <span className="font-bold relative -left-3 transition-all duration-300 ease-out group-hover:opacity-0 group-hover:scale-95 group-hover:translate-y-1">
          Buzz's<span className="text-[#fa7c96]">Hub</span>
        </span>
        <span className="font-bold relative -left-22 text-gray-500 transition-all ease-in opacity-0 group-hover:opacity-100">
          Home
        </span>
      </div>
    </Link>
  );
};

export default Logo;
