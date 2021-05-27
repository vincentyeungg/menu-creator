import React, { useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from '../../../shared/components/Button/Button';
import Input from '../../../shared/components/Input/Input';
import useForm from "../../../shared/hooks/form-hook";
import ErrorModal from "../../../shared/components/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";
import useHttpClient from '../../../shared/hooks/http-hook';
import { AuthContext } from "../../../shared/context/auth-context";
import ImageUpload from "../../../shared/components/ImageUpload/ImageUpload";

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
            image: {
                value: null,
                isValud: false
            }
        },
        // initial form validity
        false
    );

    const submitFormHandler = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', formState.inputs.title.value);
            formData.append('description', formState.inputs.description.value);
            formData.append('price', formState.inputs.price.value);
            formData.append('type', itemType);
            formData.append('image', formState.inputs.image.value);
            const responseData = await sendRequest(
                `http://localhost:5000/api/menuItems/${menuId}`,
                'POST',
                formData,
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
            {!isLoading && 
                <div className="createItem__container">
                    <h2 className="createItem__title">Create a new Menu Item</h2>
                    <form className="createItem__form" onSubmit={submitFormHandler}>
                        <Input 
                            element="input"
                            id="title"
                            type="text"
                            label="Item Name"
                            errorText="Please enter a valid name for the menu item that is no more than 25 characters."
                            validator={"REQUIRE_MINMAX"}
                            onInput={inputHandler}
                        />
                        <Input 
                            element="textarea"
                            id="description"
                            label="Item Description"
                            errorText="Please enter a valid description for the menu item."
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
                        <div className="createItem__image">
                            <p>Select an image:</p>
                            <ImageUpload id="image" onInput={inputHandler} />
                        </div>
                        <p>Type: {itemType === "" ? "Please select a type for this item below." : itemType}</p>
                        <div>
                            <Button type="button" onClick={onOptionClick}>Appetizer</Button>
                            <Button type="button" onClick={onOptionClick}>Main</Button>
                            <Button type="button" onClick={onOptionClick}>Dessert</Button>
                            <Button type="button" onClick={onOptionClick}>Beverage</Button>
                        </div>
                        <div className="createItem__submit">
                            <Button type="submit" disabled={!formState.isValid || itemType === ""}>Add new item</Button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default CreateItem;
