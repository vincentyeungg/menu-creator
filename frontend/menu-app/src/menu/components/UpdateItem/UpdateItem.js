import React from 'react';
import { useParams } from 'react-router-dom';
import { userId, menuId, DUMMY_APPS, DUMMY_MAINS, DUMMY_DESSERTS, DUMMY_BEVERAGES } from "../../../TEMP_DATA";

import Input from "../../../shared/components/Input/Input";
import Button from "../../../shared/components/Button/Button";
import useForm from "../../../shared/hooks/form-hook";

function UpdateItem() {

    const itemId = useParams().itemId;

    // const identifiedItem = DUMMY_APPS.find(item => item.id === itemId);
    const identifiedItem = DUMMY_APPS[0];

    const [formState, inputHandler] = useForm(
        // initial form inputs for login page
        {
            title: {
                value: identifiedItem.title,
                isValid: true
            },
            description: {
                value: identifiedItem.description,
                isValid: true
            },
            price: {
                value: identifiedItem.price,
                isValid: true
            }
        },
        // initial form validity
        true
    );

    if (!identifiedItem) {
        return (
            <div>
                <h2>Could not find item!</h2>
            </div>
        );
    }

    const onUpdateItem = () => {
        console.log("updated item.")
    }

    return (
        <div>
            <form onSubmit={onUpdateItem}>
                <Input 
                    id="title"
                    element="input"
                    type="text"
                    label="Item Name"
                    validator={"REQUIRE"}
                    errorText="Please enter a valid title for your menu item."
                    onInput={inputHandler}
                    initialValue={identifiedItem.title}
                    initialValid={true}
                />
                <Input 
                    id="description"
                    element="textarea"
                    label="Item Description"
                    validator={"REQUIRE"}
                    errorText="Please enter a valid description for your menu item."
                    onInput={inputHandler}
                    initialValue={identifiedItem.description}
                    initialValid={true}
                />
                <Input 
                    id="price"
                    element="text"
                    type="text"
                    label="Item Price"
                    validator={"PRICE"}
                    errorText="Please enter a valid price for your menu item."
                    onInput={inputHandler}
                    initialValue={identifiedItem.price}
                    initialValid={true}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    Save Changes
                </Button>
            </form>
            <Button to={`/${userId}/${menuId}/editMenu`}>Back</Button>
        </div>
    )
}

export default UpdateItem;
