import React from 'react';
import Button from "../../../shared/components/Button/Button";

import { userId, menuId, MENUS } from "../../../TEMP_DATA";

import "./Menu.css";

function Menu() {

    // pull in available menus from current user logged in
    const hasMenu = true;

    if (hasMenu) {
        return (
            <React.Fragment>
                {MENUS.map(menu => (
                    <Button to={`/${userId}/${menu.id}`}>
                        <div>
                            <p>{menu.id}</p>
                            <p>{menu.title}</p>
                            <p>{menu.description}</p>
                            <p>{menu.creator}</p>
                            <br />
                        </div>
                    </Button>
                ))}
            </React.Fragment>
        )
    } else {
        return(
            <div>
                <h2>You currently don't have any menus.</h2>
                <p>Click <Button to={`/${userId}/createMenu`}>here</Button> to create a new menu.</p>
            </div>
        );
    }
}

export default Menu;