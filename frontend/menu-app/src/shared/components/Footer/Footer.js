import React from 'react';

import "./Footer.css";

function Footer({ isAuthenticated }) {
    return (
        <div className={`footer ${!isAuthenticated && "footer--authentication"}`}>
            <h2 className="footer__name">Vincent Yeung © 2021</h2>
            <h2 className="footer__link">LinkedIn</h2>
            <h2 className="footer__link">Github</h2>
        </div>
    )
}

export default Footer;
