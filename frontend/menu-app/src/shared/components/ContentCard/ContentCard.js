import React from 'react';

import "./ContentCard.css";

function ContentCard(props) {
    return (
        <div className="contentCard__main">
            <h2 className="contentCard__title">{props.title}</h2>
            <p className="contentCard__description">{props.description}</p>
            {!props.myMenu && <p className="contentCard__creator">Created by: {props.creator}</p>}
        </div>
    )
}

export default ContentCard;
