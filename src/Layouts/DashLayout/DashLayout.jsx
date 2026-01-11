import React from "react";
import { IoMdHome } from "react-icons/io";
import { Link, Outlet } from "react-router";
import logoImg from "../../assets/BuzzsH_logo.png";
import { FaUserCog, FaUsers } from "react-icons/fa";
import {
  MdDateRange,
  MdOutlineAddHomeWork,
  MdOutlineEventNote,
} from "react-icons/md";
import useRole from "../../hooks/useRole";

const DashLayout = () => {
  const { userRole } = useRole();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-pink-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn hover:bg-primary btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>

          <div>
            <Link
              to="/dashboard"
              className="cursor-pointer group flex justify-center items-center text-pink-600 italic"
            >
              <span className="font-bold transition-all duration-300 ease-out group-hover:opacity-0 group-hover:scale-95 group-hover:translate-y-1">
                Buzz'sHub
              </span>
              <span className="link link-hover relative -left-16  transition-all ease-in opacity-0 group-hover:opacity-100">
                Dashboard Home
              </span>
            </Link>
          </div>
        </nav>
        {/* Page content here */}
        <div className="p-4 h-[90vh]">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-pink-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                to={"/"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-2"
                data-tip="Buzz's Hub"
              >
                {/* Home icon */}
                <img className="w-10" src={logoImg} alt="" />
                <span className="is-drawer-close:hidden -ml-2">Buzz'sHub</span>
              </Link>
            </li>

            {/* list item */}
            <li>
              <Link
                to="/dashboard"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Dashboard Home"
              >
                {/* dashboard Home icon */}
                <IoMdHome />
                <span className="is-drawer-close:hidden">Dashboard Home</span>
              </Link>
            </li>

            {userRole?.role === "manager" && (
              <>
                <li>
                  <Link
                    to="/dashboard/myClubs"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Clubs"
                  >
                    {/* clubs icon */}
                    <MdOutlineAddHomeWork />
                    <span className="is-drawer-close:hidden">My Clubs</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/myEvents"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Events"
                  >
                    {/* events icon */}
                    <MdDateRange />
                    <span className="is-drawer-close:hidden">My Events</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/clubMembers"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Club Members"
                  >
                    {/*  icon */}
                    <FaUsers />
                    <span className="is-drawer-close:hidden">Club Members</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/eventParticipants"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Event Participants"
                  >
                    {/*  icon */}
                    <MdOutlineEventNote />
                    <span className="is-drawer-close:hidden">
                      Event Participants
                    </span>
                  </Link>
                </li>
              </>
            )}

            {userRole?.role === "admin" && (
              //list item
              <>
                <li>
                  <Link
                    to="/dashboard/manageUsers"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Users"
                  >
                    {/* Home icon */}
                    <FaUserCog />
                    <span className="is-drawer-close:hidden">Manage Users</span>
                  </Link>
                </li>
                {/* list item */}
                <li>
                  <Link
                    to="/dashboard/manageClub"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Club"
                  >
                    {/* // Home icon  */}
                    <MdOutlineAddHomeWork />
                    <span className="is-drawer-close:hidden">Manage Clubs</span>
                  </Link>
                </li>
              </>
            )}

            {userRole?.role === "user" && (
              <>
                <li>
                  <Link
                    to="/dashboard/usersClubs"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Clubs"
                  >
                    {/*  icon */}
                    <FaUsers />
                    <span className="is-drawer-close:hidden">My Clubs</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/usersEvents"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Events"
                  >
                    {/*  icon */}
                    <MdDateRange />
                    <span className="is-drawer-close:hidden">My Events</span>
                  </Link>
                </li>
              </>
            )}

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashLayout;
