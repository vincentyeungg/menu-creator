import React from 'react';
import Button from "../../Button/Button";
import { Link } from "react-router-dom";

import "./NavigationLinks.css";

function NavigationLinks({ isAuthenticated }) {

    const userId = 'u1';
    const menuId = 'm1';

    if (isAuthenticated) {
        return (
            <ul className="navigationLinks">
                <li className="navigationLinks__link">
                    <Link to="/menus" style={{textDecoration: 'none'}}>
                        <Button>Home</Button>
                    </Link>
                </li>
                <li className="navigationLinks__link">
                    <Link to="/menus" style={{ textDecoration: 'none' }}>
                        <Button>View Menus</Button>
                    </Link>
                </li>
                <li className="navigationLinks__link">
                    <Link to={`/${userId}/${menuId}`} style={{ textDecoration: 'none' }}>
                        <Button>Your Menu</Button>
                    </Link>
                </li>
                <li className="navigationLinks__link">
                    {/* will be a form later */}
                    <Link to="/logout" style={{ textDecoration: 'none' }}>
                        <Button>Logout</Button>
                    </Link>
                </li>
            </ul>
        )
    } else {
        return (
            <ul className="navigationLinks">
                <li className="navigationLinks__link">
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <Button>Login</Button>
                    </Link>
                </li>
                <li className="navigationLinks__link">
                    <Link to="/signup" style={{ textDecoration: 'none' }}>
                        <Button>Sign Up</Button>
                    </Link>
                </li>
            </ul>
        )
    }
}

export default NavigationLinks;
