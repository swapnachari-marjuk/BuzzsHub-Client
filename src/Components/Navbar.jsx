import React from "react";
import Logo from "./Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useRole from "../hooks/useRole";
import { HiMiniWrenchScrewdriver, HiWrenchScrewdriver } from "react-icons/hi2";
import { RiLogoutBoxRLine } from "react-icons/ri";

const Navbar = () => {
  const { user, logOutUser, loading } = useAuth();
  const { userRole } = useRole();
  console.log(userRole);
  console.log(user);

  const handleLogOut = () => {
    Swal.fire({
      title: "Want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D0320e",
      cancelButtonColor: "#f86983",
      confirmButtonText: "LogOut!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOutUser().then(() => toast.warn("User logged out successfully."));
      }
    });
  };

  const links = (
    <>
      <li>
        <NavLink to={"/allClubs"} className="nav-link font-bold">
          Clubs
        </NavLink>
      </li>
      <li>
        <NavLink to={"/allEvents"} className="nav-link font-bold">
          Events
        </NavLink>
      </li>
      <li>
        <NavLink to={"/aboutBH"} className="nav-link font-bold">
          About BH
        </NavLink>
      </li>
      <li>
        <NavLink to={'/contact'} className="nav-link font-bold">Contact</NavLink>
      </li>
      {userRole?.role === "user" && (
        <li>
          <NavLink to={"/becomeManager"} className="nav-link font-bold">
            Become Manager
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar drop-shadow-xs max-w-7xl mx-auto">
      <div className="navbar-start">
        <div className="dropdown relative z-5">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm md:btn-md lg:hidden hover:bg-pink-200 hover:text-pink-600 transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-pink-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Logo />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end">
        {loading ? (
          <span className="loading loading-ring loading-xl"></span>
        ) : user ? (
          <div className="dropdown dropdown-end ">
            {/* user info dropdown */}
            <div tabIndex={0} role="button" className="m-1">
              <div className="flex justify-center items-center gap-1">
                <img
                  className="w-8 rounded-full "
                  src={user?.photoURL}
                  alt="user avatar"
                  title={user?.displayName}
                />
              </div>
            </div>

            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-pink-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <div className="flex justify-center items-center">
                  <img
                    className="w-10 rounded-full"
                    src={user.photoURL}
                    alt="user avatar"
                  />
                </div>
              </li>
              <li className="nav-link">
                <Link to="/dashboard">
                  <HiMiniWrenchScrewdriver />
                  Dashboard
                </Link>
              </li>
              <li>
                <button onClick={handleLogOut} className="nav-link">
                  <RiLogoutBoxRLine />
                  LogOut
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <Link className="btn btn-primary lg:btn-md btn-sm" to={"/register"}>
              Register
            </Link>
            <Link
              className="btn btn-ghost lg:btn-md btn-sm bg-transparent border-none hover:underline text-pink-500"
              to={"/login"}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
