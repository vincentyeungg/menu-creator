import React, { useState } from 'react';
import Input from "../../../shared/components/Input/Input";
import Button from "../../../shared/components/Button/Button";
import useForm from '../../../shared/hooks/form-hook';
import { Link } from "react-router-dom";

import "./Login.css";

function Login() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const onLoginHandler = (event) => {
        setIsLoggedIn(true);
        console.log("Logged in.");
        console.log(formState.inputs);
        event.preventDefault();
    }

    const [formState, inputHandler] = useForm(
        // initial form inputs for login page
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        // initial form validity
        false
    );

    return (
        <form onSubmit={onLoginHandler} >
            <Input 
                element="input"
                id="email"
                type="email"
                label="Email"
                errorText="Please enter your email."
                onInput={inputHandler}
                validator={"EMAIL"}
            />
            <Input 
                element="input"
                id="password"
                type="password"
                label="Password"
                errorText="Please enter your password."
                onInput={inputHandler}
                validator={"PASSWORD"}
            />
            <Button type="submit" disabled={!formState.isValid}>Login</Button>
            <p className="login__description">
                Don't have an account? Click <Link to="/signup">here</Link> to sign up!
            </p>
        </form>
    )
}

export default Login;
