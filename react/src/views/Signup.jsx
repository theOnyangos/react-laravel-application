import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signin() {
    const [errors, setErrors] = useState(null);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    // Use the useStateContect
    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmRef.current.value,
        };
        // alert(JSON.stringify(payload));
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                // Updating the stateContext
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                // Getting errors comming from the server
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };
    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">Signup for free</h1>
            {/* Handling Input Validation */}
            {errors && (
                <div className="alert">
                    {Object.keys(errors).map((key) => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            )}
            {/* Form inputs */}
            <input ref={nameRef} type="text" placeholder="Full Name" />
            <input ref={emailRef} type="email" placeholder="Email Address" />
            <input
                ref={passwordRef}
                type="password"
                name=""
                placeholder="Password"
            />
            <input
                ref={passwordConfirmRef}
                type="password"
                name=""
                placeholder="Password Confirmation"
            />
            <button className="btn btn-block">Signup</button>
            <p className="message">
                Already Registered ? <Link to="/login"> Sign in</Link>
            </p>
        </form>
    );
}
