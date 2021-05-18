import React, { useContext } from 'react';
import { useParams } from 'react-router';
import Button from '../../../shared/components/Button/Button';
import { AuthContext } from "../../../shared/context/auth-context";

function MenuOptions() {
    const auth = useContext(AuthContext);
    const menuId = useParams().menuId;

    return (
        <React.Fragment>
            <div className="menu__options">
                {/* <Button to={`/${auth.userId}/createMenu`}>Create New Menu</Button> */}
                <Button to={`/${auth.userId}/menu/${menuId}/deleteMenu`}>Remove Menu</Button>
                <Button to={`/${auth.userId}/menu/${menuId}/editMenu`}>Edit Menu</Button>
            </div>
        </React.Fragment>
    )
}

export default MenuOptions;
