import React, { useContext } from 'react';
import Button from '../../../shared/components/Button/Button';
import Input from "../../../shared/components/Input/Input";
import useForm from '../../../shared/hooks/form-hook';
import useHttpClient from "../../../shared/hooks/http-hook";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../shared/context/auth-context";
import ErrorModal from "../../../shared/components/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";

import "./Signup.css";

function Signup() {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

    const onSignupHandler = async (event) => {
        event.preventDefault();
        try {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/users/signup`, 
                'POST', 
                JSON.stringify({
                    firstname: formState.inputs.firstname.value,
                    lastname: formState.inputs.lastname.value,
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            auth.login(responseData.user.userId, responseData.user.token);
        } catch (error) {
            // error is handled in custom hook, however it will throw error thus use try-catch here
        }      
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            <div className="signup__container">
                <h2 className="signup__title">SIGN UP</h2>
                <form className="signup__form" onSubmit={onSignupHandler}>
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
                    <div className="signup__btn">
                        <Button 
                            type="submit" 
                            disabled={!formState.isValid || !(formState.inputs.password.value === formState.inputs.confirmPassword.value)}
                        >
                            Sign Up
                        </Button>
                    </div>
                    <p className="signup__description">
                        Already have an account? Click <Link to="/login">here</Link> to login!
                    </p>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Signup;