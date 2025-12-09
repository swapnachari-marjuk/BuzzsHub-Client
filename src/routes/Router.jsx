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
        Component: CreateClub,
      },
      {
        path: "/becomeManager",
        Component: BecomeManager,
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
]);

export default router;
