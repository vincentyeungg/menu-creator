import React from 'react';
import { Link } from 'react-router-dom';

import "./Button.css";

function Button(props) {
    const getItem = () => {
        const identifier = {
            id: props.id,
            creator: props.creator,
            menu: props.menu,
            title: props.title,
            description: props.description,
            price: props.price,
            image: props.image
        };
        props.onClick(identifier);
    }

    if (props.editBtn && props.to) {
        return (
            <Link 
                to={props.to}
                exact={props.exact}
            >
                <button className="button" onClick={getItem} disabled={props.disabled} type={props.type}>
                    {props.children}
                </button>
            </Link>
        );
    }

    if (props.to) {
        return (
            <Link 
                to={props.to}
                exact={props.exact}
            >
                <button className="button" onClick={props.onClick} disabled={props.disabled}>
                    {props.children}
                </button>
            </Link>
        );
    }

    return (
        <button className="button" onClick={props.onClick} disabled={props.disabled} type={props.type}>
            {props.children}
        </button>
    )
}

export default Button;
