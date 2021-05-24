import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useHttpClient from '../../../shared/hooks/http-hook';
import ErrorModal from "../../../shared/components/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../../shared/context/auth-context";
import Button from '../../../shared/components/Button/Button';
import { isMenuOwner } from "../../../shared/utils/permissionsValidation";

function RemoveMenu() {
    const auth = useContext(AuthContext);
    const menuId = useParams().menuId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const history = useHistory();
    const [loadedMenu, setLoadedMenu] = useState();

    useEffect(() => {
        const fetchMenu = async() => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/menus/${menuId}`);
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
                `http://localhost:5000/api/menus/${menuId}`,
                'DELETE'
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
                <div className="removeMenu__menuItem">
                    <div className="menuItem__description">
                        <h1>{loadedMenu.title}</h1>
                        <p>{loadedMenu.description}</p>
                    </div>
                    <div className="menuItem__delete">
                        <p>Are you sure you want to delete this menu? Please note that this action cannot be undone.</p>
                    </div>
                    <Button to={`/${auth.userId}/menu/${menuId}`}>Cancel</Button>
                    <Button style="delete" onClick={deleteHandler}>Delete</Button>
                </div>
            }
        </div>
    )
}

export default RemoveMenu;
