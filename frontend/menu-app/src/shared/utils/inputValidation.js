// this is used to validate inputs used in the app
const validate = (value, validatorType) => {
    let isValid = true;
    if (validatorType === "PASSWORD") {
        return isValid && value.trim().length >= 6;
    } 
    if (validatorType === "EMAIL") {
        return isValid && /^\S+@\S+\.\S+$/.test(value);
    } 
    if (validatorType === "REQUIRE") {
        return isValid && value.trim().length > 0;
    } else {
        return false;
    }
}

export default validate;