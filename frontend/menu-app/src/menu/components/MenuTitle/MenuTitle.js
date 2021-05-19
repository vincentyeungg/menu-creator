import React from 'react';
import './MenuTitle.css';

function MenuTitle(props) {
    return (
        <React.Fragment>
            <h1 className="menuTitle">{props.title}</h1>
        </React.Fragment>
    )
}

export default MenuTitle;
