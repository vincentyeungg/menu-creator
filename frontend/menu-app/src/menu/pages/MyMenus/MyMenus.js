import React, { useContext, useEffect, useState } from 'react';
import Button from "../../../shared/components/Button/Button";
import { AuthContext } from "../../../shared/context/auth-context";
import ContentCard from "../../../shared/components/ContentCard/ContentCard";
import useHttpClient from '../../../shared/hooks/http-hook';
import ErrorModal from "../../../shared/components/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";

import "./MyMenus.css";

function MyMenus() {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedMenus, setLoadedMenus] = useState();

    useEffect(() => {
        const fetchMenus = async() => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/menus/user/${auth.userId}`);
                setLoadedMenus(responseData.menus);
            } catch (error) {
                // error is handled in custom hook, however it will throw error thus use try-catch here
            }
        };
        fetchMenus();
    },[sendRequest]);

    if (loadedMenus && loadedMenus.length !== 0 && !isLoading) {
        return (
            <React.Fragment>
                <ErrorModal error={error} onClear={clearError} />
                {isLoading && <LoadingSpinner asOverlay />}
                {!isLoading && 
                    <React.Fragment>
                        <div className="menus__createMenu">
                            <h2>Have other ideas for another menu?</h2>
                            <p>Click <Button to={`/${auth.userId}/createMenu`}>here</Button> to create a new menu.</p>
                        </div>
                        <div className="menus__title">
                            <h1>Your Menus</h1>
                        </div>
                        <div className="menus__container">
                            <ul className="container__menu">
                                {loadedMenus.map(menu => (
                                    <li>
                                        <ContentCard 
                                            key={menu.id}
                                            title={menu.title}
                                            description={menu.description}
                                            creator={menu.creator.firstname + " " + menu.creator.lastname}
                                        />
                                        <Button to={`/${auth.userId}/menu/${menu.id}`}>View Menu</Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </React.Fragment>
                }
            </React.Fragment>
        )
    } else {
        return(
            <React.Fragment>
                <ErrorModal error={error} onClear={clearError} />
                {isLoading && <LoadingSpinner asOverlay />}
                <div className="menus__createMenu">
                    <h2>You currently don't have any menus.</h2>
                    <p>Click <Button to={`/${auth.userId}/createMenu`}>here</Button> to create a new menu.</p>
                </div>
            </React.Fragment>
        );
    }
}

export default MyMenus;
