import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MenuHeader from "../../components/MenuHeader/MenuHeader";
import HorizontalRow from "../../components/HorizontalRow/HorizontalRow";
import MenuDescription from "../../components/MenuDescription/MenuDescription";
import MenuSection from "../../components/MenuSection/MenuSection";
import useHttpClient from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../../shared/components/ErrorModal/ErrorModal";

function ViewMenu() {
    const menuId = useParams().menuId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedMenu, setLoadedMenu] = useState();
    const [loadedMenuItems, setLoadedMenuItems] = useState();

    //intially load the menu contents here on every refresh
    useEffect(() => {
        const fetchMenu = async() => {
            try {
                const responseDataMenu = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/menus/${menuId}`);
                setLoadedMenu(responseDataMenu.menu);
            } catch (error) {
                // error is handled in custom hook, however it will throw error thus use try-catch here
            }
        };
        const fetchMenuItems = async() => {
            try {
                const responseDataMenuItems = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/menuItems/menu/${menuId}`);
                setLoadedMenuItems(responseDataMenuItems.menuItems);
            } catch (error) {
                // error is handled in custom hook, however it will throw error thus use try-catch here
            }
        };
        fetchMenu();
        fetchMenuItems();
    }, [sendRequest]);

    return (
        <div>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && loadedMenu && loadedMenuItems && 
                <React.Fragment>
                    <MenuHeader title={loadedMenu.title}/>
                    <MenuDescription description={loadedMenu.description}/>
                    <HorizontalRow />
                    <div className="menuSection">
                        <MenuSection items={loadedMenuItems} />
                    </div>
                </React.Fragment>
            }
        </div>
    )
}

export default ViewMenu;
