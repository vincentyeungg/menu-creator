import React from 'react';
import MenuTitle from "../MenuTitle/MenuTitle";
import MenuOptions from "../MenuOptions/MenuOptions";

import "./MenuHeader.css";

function MenuHeader() {
    return (
        <React.Fragment>
            <hr className="horizontalRow__bold" />
            <div className="menu__header">
                <MenuTitle />
                <MenuOptions />
            </div>
            <hr className="horizontalRow__bold" />
        </React.Fragment>
    )
}

export default MenuHeader;
