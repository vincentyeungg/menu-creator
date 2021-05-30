import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from "../../../shared/components/Button/Button";
import MenuItem from "../../components/MenuItem/MenuItem";
import { AuthContext } from "../../../shared/context/auth-context";
import useHttpClient from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../../shared/components/ErrorModal/ErrorModal";
import { isMenuOwner } from "../../../shared/utils/permissionsValidation";

import "./EditMenu.css";

function EditMenu() {

    const auth = useContext(AuthContext);
    const menuId = useParams().menuId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedMenu, setLoadedMenu] = useState();
    const [loadedMenuItems, setLoadedMenuItems] = useState();

    //intially load the menu contents here on every refresh
    useEffect(()=>{
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
            {!isLoading && loadedMenu && loadedMenuItems && isMenuOwner(loadedMenu, auth.userId) && 
                <React.Fragment>
                    <div className="editMenu__options">
                        <p className="btn">Click <Button to={`/${auth.userId}/menu/${menuId}/createItem`}>here</Button> to create a new item.</p>
                        <p className="btn">Click <Button to={`/${auth.userId}/menu/${menuId}`}>here</Button> to view the entire menu.</p>
                        <p className="btn">Click <Button to={`/${auth.userId}/menu/${menuId}/editMenu/edit`}>here</Button> to edit the menu title and description.</p>
                    </div>
                    <div className="items_container">
                        <ul className="items_list">
                            {loadedMenuItems.map(item => (
                                <li key={item._id}>
                                    <MenuItem 
                                        id={item._id}
                                        title={item.title}
                                        description={item.description}
                                        price={item.price}
                                        image={item.image}
                                        menu={item.menu}            
                                    />
                                    <div className="options__btn">
                                        <div className="btn">
                                            <Button 
                                                to={`/${auth.userId}/${menuId}/editMenu/editItem/${item._id}`}
                                            >
                                                Edit Item
                                            </Button>
                                        </div>
                                        <div className="btn">
                                            <Button 
                                                to={`/${auth.userId}/${menuId}/editMenu/removeItem/${item._id}`}
                                                style="delete"
                                            >
                                                Delete Item
                                            </Button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </React.Fragment>
            }
        </div>
    )
}

export default EditMenu;
