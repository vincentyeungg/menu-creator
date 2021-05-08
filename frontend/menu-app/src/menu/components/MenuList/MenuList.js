import React from 'react';
import MenuItem from "../MenuItem/MenuItem";

import "./MenuList.css";

function MenuList(props) {

    const items = props.items;

    return (
        <React.Fragment>
            <h2 className="menuList_sectionName">{props.sectionName}</h2>
            <ul className="menuList__list">
                {items.map(item => (
                    <li className="menuList__listItem">
                        <MenuItem 
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                        />
                    </li>
                ))}
            </ul>
            <div className="menuList__options">
                <button className="menuList__option">Add New {props.sectionName}</button>
            </div>
        </React.Fragment>
    )
}

export default MenuList;
