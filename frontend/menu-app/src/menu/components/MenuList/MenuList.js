import React from 'react';
import MenuItem from "../MenuItem/MenuItem";

import "./MenuList.css";

function MenuList(props) {

    const items = props.items;

    return (
        <React.Fragment>
            <h2 className="menuList_sectionName">{props.sectionName}</h2>
            {items.length === 0 ? (<h2 className="noItems_msge">No {props.sectionName} added.</h2>) : 
            <div className="menuList__container">
                <ul className="menuList__list">
                    {items.map(item => (
                        <li key={item.id} className="menuList__listItem">
                            <MenuItem 
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                                creator={item.creator}
                                menu={item.menu}             
                            />
                        </li>
                    ))}
                </ul>
            </div>
            }
        </React.Fragment>
    )
}

export default MenuList;
