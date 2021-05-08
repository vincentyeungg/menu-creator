import React from 'react';

import NavigationLinks from "../NavigationLinks/NavigationLinks";
import NavigationHeader from "../NavigationHeader/NavigationHeader";

import "./NavigationBar.css";

function NavigationBar() {
    return (
        <React.Fragment>
            <NavigationHeader />
            <div className="navigationBar__navlinks">
                <NavigationLinks />
            </div>
        </React.Fragment>
    )
}

export default NavigationBar;
