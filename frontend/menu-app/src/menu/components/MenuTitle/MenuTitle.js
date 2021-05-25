import React from 'react';
import './MenuTitle.css';

function MenuTitle(props) {
    return (
        <React.Fragment>
            <h2 className="menuTitle">{props.title}</h2>
        </React.Fragment>
    )
}

export default MenuTitle;
