import React from 'react';
import Button from '../../../shared/components/Button/Button';

function MenuOptions() {

    const userId = "u1";
    const menuId = "m1";

    return (
        <React.Fragment>
            <div className="menu__options">
                <Button to={`/${userId}/createMenu`}>Create New Menu</Button>
                <Button to={`/${userId}/${menuId}/deleteMenu`}>Remove Menu</Button>
                <Button to={`/${userId}/${menuId}/editMenu`}>Edit Menu</Button>
            </div>
        </React.Fragment>
    )
}

export default MenuOptions;
