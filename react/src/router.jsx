import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import { NotFound } from "./views/Notfound";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import Dashboard from "./views/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            // These routes belong to the dashboard layout
            {
                path: "/",
                element: <Navigate to="/users" />,
            },
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            // These routes belong to the guest layout
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
    {
        // Error handling 404 Page
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
