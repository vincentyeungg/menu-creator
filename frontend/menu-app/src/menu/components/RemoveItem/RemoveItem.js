import React, { useEffect, useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Input from "../../../shared/components/Input/Input";
import Button from "../../../shared/components/Button/Button";
import useHttpClient from '../../../shared/hooks/http-hook';
import ErrorModal from "../../../shared/components/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../../shared/context/auth-context";
import MenuItem from "../../../menu/components/MenuItem/MenuItem";

import "./RemoveItem.css";

function RemoveItem(props) {
    const auth = useContext(AuthContext);
    const itemId = useParams().itemId;
    const menuId = useParams().menuId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedItem, setLoadedItem] = useState();
    const history = useHistory();

    useEffect(() => {
        const fetchItem = async() => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/menuItems/${itemId}`);
                setLoadedItem(responseData.menuItem);
            } catch (error) {
                // error is handled in custom hook, however it will throw error thus use try-catch here
            }
        };
        fetchItem();
    }, [sendRequest]);
    
    const deleteHandler = async (event) => {
        event.preventDefault();
        try {
            const responseData = await sendRequest(
                `http://localhost:5000/api/menuItems/${itemId}`,
                'DELETE'
            );
            history.push(`/${auth.userId}/menu/${menuId}/editMenu`);
        } catch (error) {
            // error is handled in custom hook, however it will throw error thus use try-catch here
        }
    };

    return (
        <div>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && loadedItem && 
                <div>
                    <MenuItem 
                        id={loadedItem._id}
                        title={loadedItem.title}
                        description={loadedItem.description}
                        price={loadedItem.price}
                        image={loadedItem.image}
                        menu={loadedItem.menu}
                    />
                    <p>Are you sure you want to delete this item from the menu? Please note this action cannot be undone.</p>
                    <div className="options">
                        <Button to={`/${auth.userId}/menu/${menuId}/editMenu`}>Cancel</Button>
                        <Button onClick={deleteHandler}>Delete</Button>
                    </div>
                </div>
            }
        </div>
    )
}

export default RemoveItem;
