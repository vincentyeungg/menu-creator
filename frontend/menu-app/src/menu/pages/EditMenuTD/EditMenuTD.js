import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Input from "../../../shared/components/Input/Input";
import Button from "../../../shared/components/Button/Button";
import useForm from "../../../shared/hooks/form-hook";
import useHttpClient from '../../../shared/hooks/http-hook';
import ErrorModal from "../../../shared/components/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../../shared/context/auth-context";
import { isMenuOwner } from "../../../shared/utils/permissionsValidation";

function EditMenuTD() {
    const auth = useContext(AuthContext);
    const menuId = useParams().menuId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedMenu, setLoadedMenu] = useState();
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
            }
        },
        // initial form validity
        true
    );

    useEffect(() => {
        const fetchMenu = async() => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/menus/${menuId}`);
                setLoadedMenu(responseData.menu);
            } catch (error) {
                // error is handled in custom hook, however it will throw error thus use try-catch here
            }
        };
        fetchMenu();
    }, [sendRequest]);

    const onUpdateMenu = async (event) => {
        event.preventDefault();
        try {
            const responseData = await sendRequest(
                `http://localhost:5000/api/menus/${menuId}`,
                'PATCH',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                }),
                {
                    'Content-Type': 'application/json'
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
            {!isLoading && loadedMenu && isMenuOwner(loadedMenu, auth.userId) && 
                <React.Fragment>
                    <form onSubmit={onUpdateMenu}>
                        <Input 
                            id="title"
                            element="input"
                            type="text"
                            label="Menu Title"
                            validator={"REQUIRE_MINMAX"}
                            errorText="Please enter a valid title for your menu that is no more than 25 characters."
                            onInput={inputHandler}
                            initialValue={loadedMenu.title}
                            initialValid={true}
                        />
                        <Input 
                            id="description"
                            element="textarea"
                            label="Menu Description"
                            validator={"REQUIRE"}
                            errorText="Please enter a valid description for your menu."
                            onInput={inputHandler}
                            initialValue={loadedMenu.description}
                            initialValid={true}
                        />
                        <Button type="submit" disabled={!formState.isValid}>
                            Save Changes
                        </Button>
                    </form>
                    <Button to={`/${auth.userId}/menu/${menuId}/editMenu`}>Back</Button>
                </React.Fragment>
            }
        </div>
    )
}

export default EditMenuTD;
