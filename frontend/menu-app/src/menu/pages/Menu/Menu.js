import React from 'react';
import MenuHeader from "../../components/MenuHeader/MenuHeader";
import HorizontalRow from "../../components/HorizontalRow/HorizontalRow";
import MenuDescription from "../../components/MenuDescription/MenuDescription";
import MenuSection from "../../components/MenuSection/MenuSection";

import "./Menu.css";

function Menu() {
    return (
        <React.Fragment>
            <MenuHeader />
            {/* dynamic description later */}
            <MenuDescription description="Description of your Menu." />
            <HorizontalRow />
            <div className="menuSection">
                <MenuSection />
            </div>
        </React.Fragment>
    )
}

export default Menu;