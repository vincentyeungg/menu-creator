import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useHttpClient from '../../../shared/hooks/http-hook';
import ErrorModal from "../../../shared/components/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../../shared/context/auth-context";
import Button from '../../../shared/components/Button/Button';
import { isMenuOwner } from "../../../shared/utils/permissionsValidation";

import "./RemoveMenu.css";

function RemoveMenu() {
    const auth = useContext(AuthContext);
    const menuId = useParams().menuId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const history = useHistory();
    const [loadedMenu, setLoadedMenu] = useState();

    useEffect(() => {
        const fetchMenu = async() => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/menus/${menuId}`);
                setLoadedMenu(responseData.menu);
            } catch (error) {
                // error is handled in custom hook, however it will throw error thus use try-catch here
            }
        };
        fetchMenu();
    }, [sendRequest]);

    const deleteHandler = async (event) => {
        event.preventDefault();
        try {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/menus/${menuId}`,
                'DELETE',
                null,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            );
            history.push(`/${auth.userId}/viewMenus`);
        } catch (error) {
            // error is handled in custom hook, however it will throw error thus use try-catch here
        }
    };

    return (
        <div>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && loadedMenu && isMenuOwner(loadedMenu, auth.userId) && 
                <div className="removeMenu__menu">
                    <h1 className="removeMenu__title">{loadedMenu.title}</h1>
                    <div className="menu__description">
                        <p>{loadedMenu.description}</p>
                    </div>
                    <div className="menu__delete">
                        <p>Are you sure you want to delete this menu? <b>Please note that this action cannot be undone.</b></p>
                    </div>
                    <div className="menu__options">
                        <div className="removeMenu__btn">
                            <Button to={`/${auth.userId}/menu/${menuId}`}>Cancel</Button>
                        </div>
                        <div className="removeMenu__btn">
                            <Button style="delete" onClick={deleteHandler}>Delete</Button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default RemoveMenu;
