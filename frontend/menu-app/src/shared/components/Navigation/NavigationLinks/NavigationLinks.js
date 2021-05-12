import React, { useContext } from 'react';
import Button from "../../Button/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";
import { userId, menuId } from "../../../../TEMP_DATA";

import "./NavigationLinks.css";

function NavigationLinks() {

    const auth = useContext(AuthContext);

    if (auth.isLoggedIn) {
        return (
            <ul className="navigationLinks">
                <li className="navigationLinks__link">
                    <Button to="/menus">Home</Button>
                </li>
                {/* <li className="navigationLinks__link">
                    <Button to="/menus">View Menus</Button>
                </li> */}
                <li className="navigationLinks__link">
                    <Button to={`/${userId}/viewMenus`}>View Menus</Button>
                </li>
                <li className="navigationLinks__link">
                    {/* will be a form later */}
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
