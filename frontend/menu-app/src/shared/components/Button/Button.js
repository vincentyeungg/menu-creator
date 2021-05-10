import React from 'react';

import "./Button.css";

function Button(props) {
    return (
        <button className="button" onClick={props.onClick} disabled={props.disabled}>
            {props.children}
        </button>
    )
}

export default Button;
