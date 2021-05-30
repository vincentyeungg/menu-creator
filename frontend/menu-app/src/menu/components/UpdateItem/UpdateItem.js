import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from "../../../shared/components/Input/Input";
import Button from "../../../shared/components/Button/Button";
import useForm from "../../../shared/hooks/form-hook";
import useHttpClient from '../../../shared/hooks/http-hook';
import ErrorModal from "../../../shared/components/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../../shared/context/auth-context";
import ImageUpload from "../../../shared/components/ImageUpload/ImageUpload";

import "./UpdateItem.css";

function UpdateItem() {
    const auth = useContext(AuthContext);
    const itemId = useParams().itemId;
    const menuId = useParams().menuId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedItem, setLoadedItem] = useState();
    const history = useHistory();

    const [formState, inputHandler] = useForm(
        // initial form inputs for login page
        {
            title: {
                value: "",
                isValid: true
            },
            description: {
                value: "",
                isValid: true
            },
            price: {
                value: "",
                isValid: true
            },
            image: {
                value: null,
                isValid: true
            }
        },
        // initial form validity
        true
    );

    useEffect(() => {
        const fetchItem = async() => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/menuItems/${itemId}`);
                setLoadedItem(responseData.menuItem);
            } catch (error) {
                // error is handled in custom hook, however it will throw error thus use try-catch here
            }
        };
        fetchItem();
    }, [sendRequest, itemId]);

    const onUpdateItem = async (event) => {
        event.preventDefault();
        
        try {
            const formData = new FormData();
            formData.append('title', formState.inputs.title.value);
            formData.append('description', formState.inputs.description.value);
            formData.append('price', formState.inputs.price.value);
            formData.append('image', formState.inputs.image.value);
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/menuItems/${itemId}`,
                'PATCH',
                formData,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            );
            // maybe show a saved indicator
            history.push(`/${auth.userId}/menu/${menuId}/editMenu`);
        } catch (error) {
            // error is handled in custom hook, however it will throw error thus use try-catch here
        }
    }

    return (
        <div>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && loadedItem && 
                <React.Fragment>
                    <div className="updateItem__container">
                        <h2 className="updateItem__title">Update an Item</h2>
                        <form className="updateItem__form" onSubmit={onUpdateItem}>
                            <Input 
                                id="title"
                                element="input"
                                type="text"
                                label="Item Name"
                                validator={"REQUIRE_MINMAX"}
                                errorText="Please enter a valid title for your menu item that is no more than 25 characters."
                                onInput={inputHandler}
                                initialValue={loadedItem.title}
                                initialValid={true}
                            />
                            <Input 
                                id="description"
                                element="textarea"
                                label="Item Description"
                                validator={"REQUIRE"}
                                errorText="Please enter a valid description for your menu item."
                                onInput={inputHandler}
                                initialValue={loadedItem.description}
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
                                initialValue={loadedItem.price}
                                initialValid={true}
                            />
                            <div className="createItem__image">
                                <p>Select a new image:</p>
                                <ImageUpload id="image" onInput={inputHandler} initialImage={loadedItem.image} />
                            </div>
                            <div className="updateItem__btns">
                                <Button to={`/${auth.userId}/menu/${menuId}/editMenu`}>Back</Button>
                                <Button type="submit" disabled={!formState.isValid}>
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </div>
                </React.Fragment>
            }
        </div>
    )
}

export default UpdateItem;
