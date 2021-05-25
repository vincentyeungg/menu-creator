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
    }
    if (validatorType === "REQUIRE_MINMAX") {
        return isValid && value.trim().length > 0 && value.trim().length < 25;
    }
    if (validatorType === "PRICE") {
        return isValid && !isNaN(value) && (Math.trunc(value) >= 0);
    }
    else {
        return false;
    }
}

export default validate;