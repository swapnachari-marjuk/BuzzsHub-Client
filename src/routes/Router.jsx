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
import ManageUsers from "../Pages/Dashboard/AdminPage/ManageUsers";
import ManageClubs from "../Pages/Dashboard/AdminPage/ManageClubs";
import AdminRout from "./AdminRout";
import MyClubs from "../Pages/Dashboard/ManagerPages/MyClubs";
import ManagerRout from "./ManagerRout";
import ClubDetails from "../Pages/ClubDetails/ClubDetails";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import CreateEvents from "../Pages/Dashboard/ManagerPages/CreateEvents";
import EventsDetails from "../Pages/EventsDetails/EventsDetails";
import MyEvents from "../Pages/Dashboard/ManagerPages/MyEvents";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage />,
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
        path: "/success-club-payment",
        Component: PaymentSuccess,
      },
      {
        path: "/allEvents",
        Component: Events,
      },
      {
        path: "/events/:eventsId",
        Component: EventsDetails,
      },
      {
        path: "/becomeManager",
        element: (
          <PrivetRout>
            <BecomeManager />
          </PrivetRout>
        ),
      },
      {
        path: "/clubDetails/:id",
        element: (
          <PrivetRout>
            <ClubDetails />
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
      // admin routs
      {
        path: "manageUsers",
        element: (
          <AdminRout>
            <ManageUsers />
          </AdminRout>
        ),
      },
      {
        path: "manageClub",
        element: (
          <AdminRout>
            <ManageClubs />
          </AdminRout>
        ),
      },

      // manager routs
      {
        path: "myClubs",
        element: <MyClubs />,
      },
      {
        path: "myEvents",
        element: <MyEvents />,
      },
      {
        path: "/dashboard/createClub",
        element: (
          <ManagerRout>
            <CreateClub />
          </ManagerRout>
        ),
      },
      {
        path: "/dashboard/createEvent/:id",
        element: (
          <ManagerRout>
            <CreateEvents />
          </ManagerRout>
        ),
      },
    ],
  },
]);

export default router;
