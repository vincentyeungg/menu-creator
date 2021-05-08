import React from 'react';

function MenuOptions() {
    return (
        <React.Fragment>
            <div className="menu__options">
                <button className="menu-options-btn">Create New Menu</button>
                <button className="menu-options-btn">Remove Menu</button>
            </div>
        </React.Fragment>
    )
}

export default MenuOptions;
