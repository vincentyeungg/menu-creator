import React, { useState } from 'react';
import Button from '../../../shared/components/Button/Button';
import Input from "../../../shared/components/Input/Input";
import useForm from '../../../shared/hooks/form-hook';
import { Link } from "react-router-dom";

import "./Signup.css";

function Signup() {

    const [isSignedUp, setIsSignedUp] = useState(false);

    const onSignupHandler = (event) => {
        setIsSignedUp(true);
        console.log("Signed up.");
        console.log(formState.inputs);
        event.preventDefault();
    };

    const [formState, inputHandler] = useForm(
        // initial form inputs for login page
        {
            firstname: {
                value: '',
                isValid: false
            },
            lastname: {
                value: '',
                isValid: false
            },
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            },
            confirmPassword: {
                value: '',
                isValid: false
            }
        },
        // initial form validity
        false
    );

    return (
        <form onSubmit={onSignupHandler}>
            <Input 
                element="input"
                id="firstname"
                type="text"
                label="First Name"
                errorText="Please enter your first name."
                onInput={inputHandler}
                validator="REQUIRE"
            />
            <Input 
                element="input"
                id="lastname"
                type="text"
                label="Last Name"
                errorText="Please enter your last name."
                onInput={inputHandler}
                validator="REQUIRE"
            />
            <Input 
                element="input"
                id="email"
                type="email"
                label="Email"
                errorText="Please enter your email address."
                onInput={inputHandler}
                validator="EMAIL"
            />
            <Input 
                element="input"
                id="password"
                type="password"
                label="Password"
                errorText="Please enter a password of at least 6 characters."
                onInput={inputHandler}
                validator="PASSWORD"
            />
            <Input 
                element="input"
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                errorText="Passwords do not match. Please re-enter your password."
                onInput={inputHandler}
                validator="PASSWORD"
            />
            <Button 
                type="submit" 
                disabled={!formState.isValid || !(formState.inputs.password.value === formState.inputs.confirmPassword.value)}
            >
                Sign Up
            </Button>
            <p className="signup__description">
                Already have an account? Click <Link to="/login">here</Link> to login!
            </p>
        </form>
    )
}

export default Signup;