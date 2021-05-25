export const getUsername = (users, userId) => {
    const currentUser = users.filter(user => user._id === userId);
    return currentUser[0].firstname + " " + currentUser[0].lastname;
};