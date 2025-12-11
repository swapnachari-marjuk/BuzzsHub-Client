import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Clubs from "../Pages/Clubs/Clubs";
import Events from "../Pages/Events/Events";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Register from "../Pages/AuthPages/Register";
import Login from "../Pages/AuthPages/Login";
import CreateClub from "../Pages/CreateClub/CreateClub";
import BecomeManager from "../Pages/BecomeManager/BecomeManager";
import PrivetRout from "./PrivetRout";
import DashLayout from "../Layouts/DashLayout/DashLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import ManageClubs from "../Pages/Dashboard/ManageClubs";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allClubs",
        Component: Clubs,
      },
      {
        path: "/allEvents",
        Component: Events,
      },
      {
        path: "/createClub",
        element: (
          <PrivetRout>
            <CreateClub />
          </PrivetRout>
        ),
      },
      {
        path: "/becomeManager",
        element: (
          <PrivetRout>
            <BecomeManager />
          </PrivetRout>
        ),
      },
    ],
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },

  {
    path: "/dashboard",
    Component: DashLayout,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "manageUsers",
        Component: ManageUsers,
      },
      {
        path: "manageClub",
        Component: ManageClubs,
      },
    ],
  },
]);

export default router;
