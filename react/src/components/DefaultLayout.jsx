import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {
    const { user, token } = useStateContext();

    // Check is the user logged in and the token is valid
    if (!token) {
        // redirect user to the login page
        return <Navigate to="/login" />;
    }

    // Logout function
    const onlogout = (ev) => {
        ev.preventDefault();
    };

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
