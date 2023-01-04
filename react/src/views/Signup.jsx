import { Link } from "react-router-dom";

export default function Signin() {
    const onSubmit = (ev) => {
        ev.preventDefault();
    };
    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">Signup for free</h1>
            <input type="email" placeholder="Full Name" />
            <input type="email" placeholder="Email Address" />
            <input type="password" name="" placeholder="Password" id="" />
            <input
                type="password"
                name=""
                placeholder="Password Confirmation"
                id=""
            />
            <button className="btn btn-block">Signup</button>
            <p className="message">
                Already Registered ? <Link to="/login"> Sign in</Link>
            </p>
        </form>
    );
}
