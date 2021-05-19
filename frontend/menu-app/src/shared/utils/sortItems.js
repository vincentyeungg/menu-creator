export const sortMenu = (menu) => {
    const appetizers = menu.filter(item => item.type === 'Appetizer');
    const mains = menu.filter(item => item.type === "Main");
    const desserts = menu.filter(item => item.type === "Dessert");
    const beverages = menu.filter(item => item.type === "Beverage");

    return { appetizers, mains, desserts, beverages };
};