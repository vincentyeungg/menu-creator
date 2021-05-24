export const isMenuOwner = (menu, userId) => {
    const isOwner = (menu.creator === userId);
    return isOwner;
};