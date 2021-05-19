import React from 'react';
import MenuTitle from "../MenuTitle/MenuTitle";
import MenuOptions from "../MenuOptions/MenuOptions";

import "./MenuHeader.css";

function MenuHeader(props) {
    return (
        <React.Fragment>
            <hr className="horizontalRow__bold" />
            <div className="menu__header">
                <MenuTitle title={props.title} />
                <MenuOptions />
            </div>
            <hr className="horizontalRow__bold" />
        </React.Fragment>
    )
}

export default MenuHeader;
