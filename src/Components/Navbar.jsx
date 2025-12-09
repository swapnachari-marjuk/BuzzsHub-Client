import React, { useState } from "react";
import Logo from "./Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logOutUser } = useAuth();

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
        <NavLink to={"/allClubs"} className="nav-link">
          Clubs
        </NavLink>
      </li>
      <li>
        <NavLink to={"/allEvents"} className="nav-link">
          Events
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar drop-shadow-xs relative z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
        {user ? (
          <div>
            <div className="dropdown dropdown-end">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                role="button"
                className="m-1"
              >
                <div className="flex justify-center items-center gap-1">
                  <img
                    className="w-8 rounded-full "
                    src={user.photoURL}
                    alt="user avatar"
                    title={user.displayName}
                  />
                </div>
              </button>
              {showDropdown && (
                <ul className="dropdown-content menu items-center lg:menu-md menu-sm bg-pink-100 rounded-box z-100 w-52 p-2 mt-5 shadow-sm">
                  <li>
                    <div className="w-20">
                      <img
                        className="w-full rounded-full"
                        src={user.photoURL}
                        alt="user avatar"
                      />
                    </div>
                  </li>
                  <li className="nav-link">
                    <p>{user.displayName}</p>
                  </li>
                  <li>
                    <p className="nav-link">{user.email}</p>
                  </li>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="btn btn-primary lg:btn-md btn-sm"
                    >
                      LogOut
                    </button>
                  </li>
                </ul>
              )}
            </div>
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
