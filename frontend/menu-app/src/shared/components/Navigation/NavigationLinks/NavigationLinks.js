import React from 'react';

import "./NavigationLinks.css";

function NavigationLinks() {
    return (
        <ul className="navigationLinks">
            <li className="navigationLinks__link">
                Home
            </li>
            <li className="navigationLinks__link">
                View Menus
            </li>
            <li className="navigationLinks__link">
                Your Menu
            </li>
            <li className="navigationLinks__link">
                Logout
            </li>
        </ul>
    )
}

export default NavigationLinks;
