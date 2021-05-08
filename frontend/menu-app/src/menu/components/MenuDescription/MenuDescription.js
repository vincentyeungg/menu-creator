import React from 'react';

import "./MenuDescription.css";

function MenuDescription(props) {
    return (
        <div>
            <h2 className="menuDescription">
                {props.description}
            </h2>
        </div>
    )
}

export default MenuDescription;
