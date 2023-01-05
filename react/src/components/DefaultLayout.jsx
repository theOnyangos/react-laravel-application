import { useEffect } from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {
    const { user, token, setUser } = useStateContext();

    // Check is the user logged in and the token is valid
    if (!token) {
        // redirect user to the login page
        return <Navigate to="/login" />;
    }

    // Logout function
    const onlogout = (ev) => {
        ev.preventDefault();
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    });

    return (
        <div id="defaultLayout">
            {/* Your Code here... */}
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">users</Link>
            </aside>

            <div className="content">
                <header>
                    <div className="">Header</div>
                    <div className="">
                        {user.name}
                        <a href="#" onClick={onlogout} className="btn-logout">
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
