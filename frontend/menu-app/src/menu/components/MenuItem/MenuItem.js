import React from 'react';

import "./MenuItem.css";

function MenuItem(props) {
    return (
        <div className="menuItem__item">
            <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt="item-img" className="menuItem__img" />
            <p className="menuItem__title">{props.title} - ${props.price}</p>
            <p className="menuItem__description">{props.description}</p>
        </div>
    )
}

export default MenuItem;
