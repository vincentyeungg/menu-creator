import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../../shared/components/Button/Button';
import { AuthContext } from "../../../shared/context/auth-context";
import useHttpClient from '../../../shared/hooks/http-hook';
import ErrorModal from "../../../shared/components/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";
import { isMenuOwner } from "../../../shared/utils/permissionsValidation";

import "./MenuOptions.css";

function MenuOptions() {
    const auth = useContext(AuthContext);
    const menuId = useParams().menuId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
    }, [sendRequest, menuId]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && loadedMenu && isMenuOwner(loadedMenu, auth.userId) &&
                <div className="menu__options">
                    <div className="btn">
                        <Button style={"delete"} to={`/${auth.userId}/menu/${menuId}/deleteMenu`}>Remove Menu</Button>
                    </div>
                    <div className="btn">
                        <Button to={`/${auth.userId}/menu/${menuId}/editMenu`}>Edit Menu</Button>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default MenuOptions;
