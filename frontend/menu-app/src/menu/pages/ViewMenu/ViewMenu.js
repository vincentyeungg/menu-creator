import React from 'react';
import { useParams } from 'react-router-dom';
import { userId, menuId, DUMMY_APPS, DUMMY_MAINS, DUMMY_DESSERTS, DUMMY_BEVERAGES } from "../../../TEMP_DATA";
import MenuHeader from "../../components/MenuHeader/MenuHeader";
import HorizontalRow from "../../components/HorizontalRow/HorizontalRow";
import MenuDescription from "../../components/MenuDescription/MenuDescription";
import MenuSection from "../../components/MenuSection/MenuSection";
import Input from "../../../shared/components/Input/Input";
import Button from "../../../shared/components/Button/Button";
import useForm from "../../../shared/hooks/form-hook";

function ViewMenus() {

    // should only display the menu
    const userId = useParams().userId;
    const menuId = useParams().menuId;

    console.log(userId, menuId);

    return (
        <div>
            <MenuHeader />
            <MenuDescription description="Description of your Menu." />
            <HorizontalRow />
            <div className="menuSection">
                <MenuSection />
            </div>
        </div>
    )
}

export default ViewMenus;
