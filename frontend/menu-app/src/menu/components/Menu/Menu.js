import React from 'react';
import MenuHeader from "../MenuHeader/MenuHeader";
import HorizontalRow from "../HorizontalRow/HorizontalRow";
import MenuDescription from "../MenuDescription/MenuDescription";
import MenuSection from "../MenuSection/MenuSection";

import "./Menu.css";

function Menu() {
    return (
        <React.Fragment>
            <MenuHeader />
            {/* dynamic description later */}
            <MenuDescription description="Description of your Menu." />
            <HorizontalRow />
            <div class="menuSection">
                <MenuSection />
            </div>
        </React.Fragment>
    )
}

export default Menu;
