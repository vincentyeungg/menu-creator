import React from 'react';
import Button from "../../../shared/components/Button/Button";

import "./MenuItem.css";

function MenuItem(props) {
    return (
        <div className="menuItem__item">
            <img src={props.image} alt="item-img" className="menuItem__img" />
            <p className="menuItem__title">{props.title} - ${props.price}</p>
            <p className="menuItem__description">{props.description}</p>
        </div>
    )
}

export default MenuItem;
