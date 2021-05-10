import React, { useReducer, useEffect } from 'react';

import Validate from "../../../shared/utils/inputValidation";

import "./Input.css";

// good to use reducer since input state depends on many events

const inputReducer = (state, action) => {
    switch(action.type) {
        case "INPUT_CHANGE": {
            return {
                ...state,
                value: action.val,
                isValid: Validate(action.val, action.validator)
            }
        }
        case "INPUT_TOUCH": {
            return {
                ...state,
                isTouched: true
            }
        }
        default:
            return state;
    }
};

function Input(props) {

    const [inputState, dispatch] = useReducer(inputReducer, {
        isTouched: false,
        isValid: props.initialValid || false,
        value: props.initialValue || ""
    });

    const { value, isValid } = inputState;
    const { id, onInput } = props;

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput]);

    const inputChangeHandler = (event) => {
        dispatch({
            type: "INPUT_CHANGE",
            val: event.target.value,
            validator: props.validator
        });
    };

    const inputTouchHandler = () => {
        dispatch({
            type: "INPUT_TOUCH"
        });
    };

    // allow input to be either a text or a description
    const element = 
        props.element === "input" ? (
            <input 
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={inputChangeHandler}
                onBlur={inputTouchHandler}
                value={inputState.value}
            />
        ) : (
            <textarea 
                id={props.id}
                rows={props.rows || 3}
                onChange={inputChangeHandler}
                onBlur={inputTouchHandler}
                value={inputState.value}
            />
        );

    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && "form-control--invalid}"}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && 
                <p>{props.errorText}</p>
            }
        </div>
    )
}

export default Input;
