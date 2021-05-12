import React from 'react';
import Input from '../../../shared/components/Input/Input';
import useForm from "../../../shared/hooks/form-hook";
import Button from "../../../shared/components/Button/Button";

function CreateMenu() {

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

    const submitFormHandler = (e) => {
        console.log("created menu");
        e.preventDefault();
    }

    return (
        <div>
            <form onSubmit={submitFormHandler}>
                <Input 
                    element="input"
                    id="title"
                    type="text"
                    label="Menu Name"
                    errorText="Please enter a name for the menu."
                    validator={"REQUIRE"}
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
                <Button type="submit" disabled={!formState.isValid}>Create new menu</Button>
            </form>
        </div>
    )
}

export default CreateMenu;
