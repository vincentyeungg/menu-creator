import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../../shared/components/Input/Input';
import useForm from "../../../shared/hooks/form-hook";
import Button from "../../../shared/components/Button/Button";
import useHttpClient from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import ErrorModal from "../../../shared/components/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";

import "./CreateMenu.css";

function CreateMenu() {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
        },
        // initial form validity
        false
    );

    const history = useHistory();

    const submitFormHandler = async (event) => {
        event.preventDefault();
        try {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/menus`,
                'POST',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                    creator: auth.userId
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            // direct user back to the menus page
            history.push(`/${auth.userId}/viewMenus`);
        } catch (error) {
            // error is handled in custom hook, however it will throw error thus use try-catch here
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && 
                <div className="createMenu__container">
                    <h2 className="createMenu__title">Create a new Menu</h2>
                    <form className="createMenu__form" onSubmit={submitFormHandler}>
                        <Input 
                            element="input"
                            id="title"
                            type="text"
                            label="Menu Name"
                            errorText="Please enter a name for the menu that is no more than 25 characters."
                            validator={"REQUIRE_MINMAX"}
                            onInput={inputHandler}
                        />
                        <Input 
                            element="textarea"
                            id="description"
                            label="Menu Description"
                            errorText="Please enter a description for the menu."
                            validator={"REQUIRE"}
                            onInput={inputHandler}
                        />
                        <div className="createMenu__btn">
                            <Button type="submit" disabled={!formState.isValid}>Create new menu</Button>
                        </div>
                    </form>
                </div>
            }
        </React.Fragment>
    )
}

export default CreateMenu;
