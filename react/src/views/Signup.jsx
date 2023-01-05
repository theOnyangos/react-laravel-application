import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signin() {
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
                    console.log(response.data.errors);
                }
            });
    };
    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">Signup for free</h1>
            <input ref={nameRef} type="text" placeholder="Full Name" />
            <input ref={emailRef} type="email" placeholder="Email Address" />
            <input
                ref={passwordRef}
                type="password"
                name=""
                placeholder="Password"
                id=""
            />
            <input
                ref={passwordConfirmRef}
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
