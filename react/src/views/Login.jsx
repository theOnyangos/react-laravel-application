import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function Login() {
    const [errors, setErrors] = useState(null);
    const emailRef = useRef();
    const passwordRef = useRef();

    // Use the useStateContect
    const { setUser, setToken } = useStateContext();
    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        setErrors(null);
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                // Updating the stateContext
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                // Getting errors comming from the server
                const response = err.response;
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message],
                        });
                    }
                }
            });
    };
    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">Login Into your Account</h1>
            {/* Handling Input Validation */}
            {errors && (
                <div className="alert">
                    {Object.keys(errors).map((key) => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            )}
            <input ref={emailRef} type="email" placeholder="Email" />
            <input
                ref={passwordRef}
                type="password"
                name=""
                placeholder="Password"
            />
            <button className="btn btn-block">Login</button>
            <p className="message">
                Not Registered? <Link to="/signup"> Create an account</Link>
            </p>
        </form>
    );
}
