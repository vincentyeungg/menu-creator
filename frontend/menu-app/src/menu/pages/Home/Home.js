import React, { useEffect, useState, useContext } from 'react';
import Button from "../../../shared/components/Button/Button";
import ContentCard from '../../../shared/components/ContentCard/ContentCard';
import ErrorModal from "../../../shared/components/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";
import useHttpClient from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import { getUsername } from "../../../shared/utils/getUsername";

import "./Home.css";

function Home() {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedMenus, setLoadedMenus] = useState();
    const [loadedUsers, setLoadedUsers] = useState();

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

    useEffect(() => {
        const fetchUsers = async() => {
            try {
                const responseData = await sendRequest('http://localhost:5000/api/users/');
                setLoadedUsers(responseData.users);   
            } catch (error) {
                // error is handled in custom hook, however it will throw error thus use try-catch here
            }
        };
        fetchUsers();
    }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && loadedMenus && loadedUsers && 
                <React.Fragment>
                    <div className="home-img">
                        <img id="home-img" src="image/home.jpg" alt="food-home-page-img" />
                    </div>
                    <div className="menus__viewAllMenus">
                        <h1 className="menu__title">Welcome {getUsername(loadedUsers, auth.userId)}</h1>
                        {loadedMenus.length === 0 ? <h2 className="menu__description">There are currently no menus available for viewing.</h2> : <h2 className="menu__description">All Menus</h2>}
                        {!isLoading && loadedMenus && 
                            <div className="menus__container">
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
            }
        </React.Fragment>
    );

}

export default Home;