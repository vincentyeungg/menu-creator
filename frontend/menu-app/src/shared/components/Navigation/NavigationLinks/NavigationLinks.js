import React, { useContext } from 'react';
import Button from "../../Button/Button";
import { AuthContext } from "../../../context/auth-context";

import "./NavigationLinks.css";

function NavigationLinks() {
    const auth = useContext(AuthContext);

    if (auth.isLoggedIn) {
        return (
            <ul className="navigationLinks">
                <li className="navigationLinks__link">
                    <Button to="/home">Home</Button>
                </li>
                <li className="navigationLinks__link">
                    <Button to={`/${auth.userId}/viewMenus`}>My Menus</Button>
                </li>
                <li className="navigationLinks__link">
                    <form onSubmit={auth.logout}>
                        <Button type="submit">Logout</Button>
                    </form>
                </li>
            </ul>
        )
    } else {
        return (
            <ul className="navigationLinks">
                <li className="navigationLinks__link">
                    <Button to="/login">Login</Button>
                </li>
                <li className="navigationLinks__link">
                    <Button to="/signup">Sign Up</Button>
                </li>
            </ul>
        )
    }
}

export default NavigationLinks;
