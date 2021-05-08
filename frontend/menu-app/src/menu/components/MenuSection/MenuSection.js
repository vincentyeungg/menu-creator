import React from 'react';
import MenuList from "../MenuList/MenuList";
import HorizontalRow from "../HorizontalRow/HorizontalRow";

import "./MenuSection.css";

function MenuSection() {

    // fetch menu items for each category later
    const DUMMY_APPS = [
        {
            id: 1,
            title: "Mini Chicken and Waffles",
            description: "A southern classic, in finger food form.",
            price: 6.25,
            image: "https://d3d127vhjgkwcw.cloudfront.net/images/articles/2015_12/Waffles358.jpg"
        },
        {
            id: 2,
            title: "Spicy Grilled Shrimp",
            description: "A delicious one-biter with a hint of spice.",
            price: 5.25,
            image: "https://d3d127vhjgkwcw.cloudfront.net/images/articles/2015_12/mld105717_0610_shrimpbeauty12_vert.jpg"
        },
        {
            id: 3,
            title: "Mini Chicken and Waffles",
            description: "A southern classic, in finger food form.",
            price: 6.25,
            image: "https://d3d127vhjgkwcw.cloudfront.net/images/articles/2015_12/Waffles358.jpg"
        },
        {
            id: 4,
            title: "Spicy Grilled Shrimp",
            description: "A delicious one-biter with a hint of spice.",
            price: 5.25,
            image: "https://d3d127vhjgkwcw.cloudfront.net/images/articles/2015_12/mld105717_0610_shrimpbeauty12_vert.jpg"
        },
        {
            id: 5,
            title: "Mini Chicken and Waffles",
            description: "A southern classic, in finger food form.",
            price: 6.25,
            image: "https://d3d127vhjgkwcw.cloudfront.net/images/articles/2015_12/Waffles358.jpg"
        },
        {
            id: 6,
            title: "Spicy Grilled Shrimp",
            description: "A delicious one-biter with a hint of spice.",
            price: 5.25,
            image: "https://d3d127vhjgkwcw.cloudfront.net/images/articles/2015_12/mld105717_0610_shrimpbeauty12_vert.jpg"
        }
    ];

    return (
        <div>
            <MenuList sectionName="Appetizers" items={DUMMY_APPS} />
            <HorizontalRow />
            <MenuList sectionName="Mains" items={DUMMY_APPS} />
            <HorizontalRow />
            <MenuList sectionName="Desserts" items={DUMMY_APPS} />
            <HorizontalRow />
            <MenuList sectionName="Beverages" items={DUMMY_APPS} />
        </div>
    )
}

export default MenuSection;
