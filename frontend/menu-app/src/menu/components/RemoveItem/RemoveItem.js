import React, { useEffect, useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from "../../../shared/components/Button/Button";
import useHttpClient from '../../../shared/hooks/http-hook';
import ErrorModal from "../../../shared/components/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../../shared/context/auth-context";
import MenuItem from "../../../menu/components/MenuItem/MenuItem";

import "./RemoveItem.css";

function RemoveItem() {
    const auth = useContext(AuthContext);
    const itemId = useParams().itemId;
    const menuId = useParams().menuId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedItem, setLoadedItem] = useState();
    const history = useHistory();

    useEffect(() => {
        const fetchItem = async() => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/menuItems/${itemId}`);
                setLoadedItem(responseData.menuItem);
            } catch (error) {
                // error is handled in custom hook, however it will throw error thus use try-catch here
            }
        };
        fetchItem();
    }, [sendRequest, itemId]);
    
    const deleteHandler = async (event) => {
        event.preventDefault();
        try {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/menuItems/${itemId}`,
                'DELETE',
                null,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            );
            history.push(`/${auth.userId}/menu/${menuId}/editMenu`);
        } catch (error) {
            // error is handled in custom hook, however it will throw error thus use try-catch here
        }
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && loadedItem && 
                <div className="removeItem__container">
                    <h2 className="removeItem__title">Remove Item</h2>
                    <div className="removeItem__item">
                        <MenuItem 
                            id={loadedItem._id}
                            title={loadedItem.title}
                            description={loadedItem.description}
                            price={loadedItem.price}
                            image={loadedItem.image}
                            menu={loadedItem.menu}
                        />
                    </div>
                    <div className="removeItem__options">
                        <p>Are you sure you want to delete this item from the menu? <b>Please note that this action cannot be undone.</b></p>
                        <div className="removeItem__btns">
                            <Button to={`/${auth.userId}/menu/${menuId}/editMenu`}>Cancel</Button>
                            <Button style={"delete"} onClick={deleteHandler}>Delete</Button>
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default RemoveItem;
