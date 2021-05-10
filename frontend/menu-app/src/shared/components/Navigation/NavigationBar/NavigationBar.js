import React from 'react';

import NavigationLinks from "../NavigationLinks/NavigationLinks";
import NavigationHeader from "../NavigationHeader/NavigationHeader";

import "./NavigationBar.css";

function NavigationBar({ isAuthenticated=true }) {
    return (
        <React.Fragment>
            <div className="navigationBar__navbar">
                <div className="navigationBar__header">
                    <NavigationHeader />
                </div>
                <div className="navigationBar__links">
                    <NavigationLinks isAuthenticated={isAuthenticated} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default NavigationBar;
