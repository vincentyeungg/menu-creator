import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../../shared/components/Input/Input';
import useForm from "../../../shared/hooks/form-hook";
import Button from "../../../shared/components/Button/Button";
import MenuItem from "../../components/MenuItem/MenuItem";
import Modal from "../../../shared/components/Modal/Modal";
import UpdateItem from "../../components/UpdateItem/UpdateItem";
import { AuthContext } from "../../../shared/context/auth-context";
import useHttpClient from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../../shared/components/ErrorModal/ErrorModal";
import { userId, menuId, DUMMY_APPS, DUMMY_MAINS, DUMMY_DESSERTS, DUMMY_BEVERAGES } from "../../../TEMP_DATA";

function EditMenu() {

    const auth = useContext(AuthContext);
    const menuId = useParams().menuId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedMenu, setLoadedMenu] = useState();
    const [loadedMenuItems, setLoadedMenuItems] = useState();

    const [formState, inputHandler] = useForm(
        // initial form inputs for login page
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            price: {
                value: '',
                isValid: false
            },
        },
        // initial form validity
        false
    );

    const onItemClick = (item) => {
        console.log(item)
    }

    //intially load the menu contents here on every refresh
    useEffect(()=>{
        const fetchMenu = async() => {
            try {
                const responseDataMenu = await sendRequest(`http://localhost:5000/api/menus/${menuId}`);
                setLoadedMenu(responseDataMenu.menu);
            } catch (error) {
                // error is handled in custom hook, however it will throw error thus use try-catch here
            }
        };
        const fetchMenuItems = async() => {
            try {
                const responseDataMenuItems = await sendRequest(`http://localhost:5000/api/menuItems/menu/${menuId}`);
                setLoadedMenuItems(responseDataMenuItems.menuItems);
            } catch (error) {
                // error is handled in custom hook, however it will throw error thus use try-catch here
            }
        };
        fetchMenu();
        fetchMenuItems();
    }, [sendRequest]);

    console.log(loadedMenuItems)

    return (
        <div>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && loadedMenu && loadedMenuItems &&
                <React.Fragment>
                    <h2>EDIT MENU</h2>
                    <p>Click <Button to={`/${auth.userId}/menu/${menuId}/createItem`}>here</Button> to create a new item.</p>
                    <ul>
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
                                <Button 
                                    to={`/${auth.userId}/${menuId}/editMenu/editItem/${item._id}`}
                                    id={item._id} 
                                    menu={item.menu}
                                    title={item.title}
                                    description={item.description}
                                    price={item.price}
                                    image={item.image}
                                    onClick={onItemClick}
                                    editBtn={true}
                                >
                                    Edit Item
                                </Button>
                                <Button 
                                    to={`/${auth.userId}/${menuId}/editMenu/removeItem/${item._id}`}
                                    id={item._id} 
                                    menu={item.menu}
                                    title={item.title}
                                    description={item.description}
                                    price={item.price}
                                    image={item.image}
                                    onClick={onItemClick}
                                    editBtn={true}
                                >
                                    Delete Item
                                </Button>
                            </li>
                        ))}
                    </ul>
                </React.Fragment>
            }
        </div>
    )
}

export default EditMenu;
