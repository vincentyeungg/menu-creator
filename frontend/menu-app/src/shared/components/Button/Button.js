import React from 'react';
import { Link } from 'react-router-dom';

import "./Button.css";

function Button(props) {
    if (props.to) {
        return (
            <Link 
                to={props.to}
                exact={props.exact}
            >
                <button className={props.style === "delete" ? "button-delete" : "button"} onClick={props.onClick} disabled={props.disabled}>
                    {props.children}
                </button>
            </Link>
        );
    }

    return (
        <button className={props.style === "delete" ? "button-delete" : "button"} onClick={props.onClick} disabled={props.disabled} type={props.type}>
            {props.children}
        </button>
    )
}

export default Button;
