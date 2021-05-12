import React from 'react';
import MenuList from "../MenuList/MenuList";
import HorizontalRow from "../HorizontalRow/HorizontalRow";
import { DUMMY_APPS, DUMMY_MAINS, DUMMY_DESSERTS, DUMMY_BEVERAGES } from "../../../TEMP_DATA";

import "./MenuSection.css";

function MenuSection() {

    return (
        <div>
            <MenuList sectionName="Appetizers" items={DUMMY_APPS} />
            <HorizontalRow />
            <MenuList sectionName="Mains" items={DUMMY_MAINS} />
            <HorizontalRow />
            <MenuList sectionName="Desserts" items={DUMMY_DESSERTS} />
            <HorizontalRow />
            <MenuList sectionName="Beverages" items={DUMMY_BEVERAGES} />
        </div>
    )
}

export default MenuSection;
