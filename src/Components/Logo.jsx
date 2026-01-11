import React from "react";
import logo from "../assets/BuzzsH_logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className="md:-ml-5 lg:ml-0 flex justify-center items-center group italic relative z-10">
        <img className="md:w-20 w-16 lg:-ml-5" src={logo} alt="" />
        <span className="font-bold relative md:-left-5 -left-3 transition-all text-shadow-sm duration-300 ease-out group-hover:opacity-0 group-hover:scale-95 group-hover:translate-y-1">
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
