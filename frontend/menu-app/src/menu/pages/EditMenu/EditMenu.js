import React, { useState } from 'react';
import Input from '../../../shared/components/Input/Input';
import useForm from "../../../shared/hooks/form-hook";
import Button from "../../../shared/components/Button/Button";
import MenuItem from "../../components/MenuItem/MenuItem";
import Modal from "../../../shared/components/Modal/Modal";
import UpdateItem from "../../components/UpdateItem/UpdateItem";
import { userId, menuId, DUMMY_APPS, DUMMY_MAINS, DUMMY_DESSERTS, DUMMY_BEVERAGES } from "../../../TEMP_DATA";

function EditMenu() {

    const [formState, inputHandler] = useForm(
        // initial form inputs for login page
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            price: {
                value: '',
                isValid: false
            },
        },
        // initial form validity
        false
    );

    const onItemClick = (item) => {
        console.log(item)
    }

    return (
        <div>
            <h2>EDIT MENU</h2>
            <ul>
                {DUMMY_APPS.map(app => (
                    <li key={app.id}>
                        <MenuItem 
                            key={app.id}
                            id={app.id}
                            title={app.title}
                            description={app.description}
                            price={app.price}
                            image={app.image}
                            creator={app.creator}
                            menu={app.menu}            
                        />
                        <Button 
                            to={`/${userId}/${menuId}/editMenu/editItem/${app.id}`}
                            id={app.id} 
                            creator={app.creator} 
                            menu={app.menu}
                            title={app.title}
                            description={app.description}
                            price={app.price}
                            image={app.image}
                            onClick={onItemClick}
                            editBtn={true}
                        >
                            Edit Item
                        </Button>
                        <Button 
                            to={`/${userId}/${menuId}/editMenu/removeItem/${app.id}`}
                            id={app.id} 
                            creator={app.creator} 
                            menu={app.menu}
                            title={app.title}
                            description={app.description}
                            price={app.price}
                            image={app.image}
                            onClick={onItemClick}
                            editBtn={true}
                        >
                            Delete Item
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default EditMenu;
