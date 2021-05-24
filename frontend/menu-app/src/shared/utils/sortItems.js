export const sortMenu = (menu) => {
    const appetizers = menu.filter(item => item.type === ("Appetizer").toUpperCase());
    const mains = menu.filter(item => item.type === ("Main").toUpperCase());
    const desserts = menu.filter(item => item.type === ("Dessert").toUpperCase());
    const beverages = menu.filter(item => item.type === ("Beverage").toUpperCase());

    return { appetizers, mains, desserts, beverages };
};