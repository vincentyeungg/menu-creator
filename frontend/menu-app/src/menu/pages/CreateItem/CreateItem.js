import React, { useState } from 'react';
import Button from '../../../shared/components/Button/Button';
import Input from '../../../shared/components/Input/Input';
import useForm from "../../../shared/hooks/form-hook";

import "./CreateItem.css";

function CreateItem() {

    const [itemType, setItemType] = useState("");

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

    const submitFormHandler = (event) => {
        console.log(
            {
                ...(formState.inputs),
                itemType
            }
        );
        event.preventDefault();
    };

    const onOptionClick = (e) => {
        const newType = e.target.innerText;
        setItemType(newType);
    };

    return (
        <div>
            <form onSubmit={submitFormHandler}>
                <Input 
                    element="input"
                    id="title"
                    type="text"
                    label="Item Name"
                    errorText="Please enter a name for the menu item."
                    validator={"REQUIRE"}
                    onInput={inputHandler}
                />
                <Input 
                    element="textarea"
                    id="description"
                    label="Item Description"
                    errorText="Please enter a description for the menu item."
                    validator={"REQUIRE"}
                    onInput={inputHandler}
                />
                <Input 
                    element="input"
                    id="price"
                    type="text"
                    label="Item Price"
                    errorText="Please enter a price for the menu item."
                    validator={"PRICE"}
                    onInput={inputHandler}
                />
                <div>
                    <Button type="button" onClick={onOptionClick}>Appetizer</Button>
                    <Button type="button" onClick={onOptionClick}>Main</Button>
                    <Button type="button" onClick={onOptionClick}>Dessert</Button>
                    <Button type="button" onClick={onOptionClick}>Beverage</Button>
                </div>
                <Button type="submit" disabled={!formState.isValid || itemType === ""}>Add new item</Button>
            </form>
        </div>
    )
}

export default CreateItem;
