import React from 'react';
import { checkMaxLength } from "../../../shared/utils/maxTextLength";

import "./ContentCard.css";

function ContentCard(props) {
    const description = checkMaxLength(props.description);

    return (
        <div className="contentCard__main">
            <h2 className="contentCard__title">{props.title}</h2>
            <p className="contentCard__description">{description}</p>
            {!props.myMenu && <p className="contentCard__creator">Created by: {props.creator}</p>}
        </div>
    )
}

export default ContentCard;
