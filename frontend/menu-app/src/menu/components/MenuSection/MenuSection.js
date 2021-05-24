import React from 'react';
import MenuList from "../MenuList/MenuList";
import HorizontalRow from "../HorizontalRow/HorizontalRow";
import { sortMenu } from "../../../shared/utils/sortItems";

import "./MenuSection.css";

function MenuSection(props) {
    const { appetizers, mains, desserts, beverages } = sortMenu(props.items);

    return (
        <div>
            <MenuList sectionName="Appetizers" items={appetizers} />
            <HorizontalRow />
            <MenuList sectionName="Mains" items={mains} />
            <HorizontalRow />
            <MenuList sectionName="Desserts" items={desserts} />
            <HorizontalRow />
            <MenuList sectionName="Beverages" items={beverages} />
        </div>
    )
}

export default MenuSection;
