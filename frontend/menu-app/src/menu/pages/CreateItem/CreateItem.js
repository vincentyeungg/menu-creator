import React, { useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from '../../../shared/components/Button/Button';
import Input from '../../../shared/components/Input/Input';
import useForm from "../../../shared/hooks/form-hook";
import ErrorModal from "../../../shared/components/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";
import useHttpClient from '../../../shared/hooks/http-hook';
import { AuthContext } from "../../../shared/context/auth-context";

import "./CreateItem.css";

function CreateItem() {
    const auth = useContext(AuthContext);
    const menuId = useParams().menuId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const history = useHistory();
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

    const submitFormHandler = async (event) => {
        event.preventDefault();
        try {
            const responseData = await sendRequest(
                `http://localhost:5000/api/menuItems/${menuId}`,
                'POST',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                    price: formState.inputs.price.value,
                    type: itemType
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            history.push(`/${auth.userId}/menu/${menuId}/editMenu`);
        } catch (error) {
            // error is handled in custom hook, however it will throw error thus use try-catch here
        }
    };

    const onOptionClick = (e) => {
        const newType = e.target.innerText;
        setItemType(newType);
    };

    return (
        <div>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
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
                <p>Type: {itemType === "" ? "Please select a type for this item below." : itemType}</p>
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
