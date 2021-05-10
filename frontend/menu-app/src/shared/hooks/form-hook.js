import { useCallback, useReducer } from 'react';

const formReducer = (state, action) => {
    switch(action.type) {
        case 'INPUT_CHANGE': {
            let formIsValid = true;
            for (const inputId in state.inputs) {
                // if username is undefined
                if(!state.inputs[inputId]) {
                    continue;
                }
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isValid: formIsValid
            };
        };
        case 'SET_DATA': {
            return {
                inputs: action.inputs,
                isValid: action.formIsValid
            }
        };
        default:
            return state;
    }
};

// this custom hook is used to validate the validity of a form used across the web app
// login, signup, creating item, deleting item, editing item
function useForm(initialInputs, initialValidity) {

    // state of the form should be valid in order to submit, and form state depends on the form inputs
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialValidity
    });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: "INPUT_CHANGE",
            value: value,
            isValid: isValid,
            inputId: id
        });
    },[]);

    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({
            type: 'SET_DATA',
            inputs: inputData,
            formIsValid: formValidity
        });
    },[]);

    return [formState, inputHandler, setFormData];
}

export default useForm;
