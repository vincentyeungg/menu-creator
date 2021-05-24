import React, { useEffect, useState, useContext } from 'react';
import Button from "../../../shared/components/Button/Button";
import ContentCard from '../../../shared/components/ContentCard/ContentCard';
import ErrorModal from "../../../shared/components/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";
import useHttpClient from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";

import "./Home.css";

function Home() {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedMenus, setLoadedMenus] = useState();

    useEffect(() => {
        const fetchMenus = async() => {
            try {
                const responseData = await sendRequest('http://localhost:5000/api/menus/');
                setLoadedMenus(responseData.menus);   
            } catch (error) {
                // error is handled in custom hook, however it will throw error thus use try-catch here
            }
        };
        fetchMenus();
    }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            <div className="menus__viewAllMenus">
                {!isLoading && loadedMenus && 
                    <div>
                        <h1 className="menu__title">All Menus</h1>
                        <ul className="menu__menus">
                            {loadedMenus.map(menu => (
                                <li key={menu.id}>
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
                }
            </div>
        </React.Fragment>
    );

}

export default Home;