import React, { useContext } from 'react';
import Input from "../../../shared/components/Input/Input";
import Button from "../../../shared/components/Button/Button";
import useForm from '../../../shared/hooks/form-hook';
import useHttpClient from "../../../shared/hooks/http-hook";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../shared/context/auth-context";
import ErrorModal from "../../../shared/components/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";

import "./Login.css";

function Login() {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

    const onLoginHandler = async (event) => {
        event.preventDefault();
        try {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/users/login`,
                'POST',
                JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                }),
                {
                    'Content-Type': 'application/json'
                },
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
            <div className="login__container">
                <h2 className="login__title">LOGIN</h2>
                <form className="login__form" onSubmit={onLoginHandler} >
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
                    <div className="login__btn">
                        <Button type="submit" disabled={!formState.isValid}>Login</Button>
                    </div>
                    <p className="login__description">
                        Don't have an account? Click <Link to="/signup">here</Link> to sign up!
                    </p>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Login;
