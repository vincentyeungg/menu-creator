export const checkMaxLength = (description) => {
    return description.length > 150 ? description.slice(0,150) + "..." : description;
};

