import React, { useContext } from 'react';
import { AuthContext } from "../../context/auth-context";

import "./Footer.css";

function Footer() {

    const auth = useContext(AuthContext);

    return (
        <div className={`footer ${!auth.isLoggedIn && "footer--authentication"}`}>
            <h2 className="footer__name">Vincent Yeung © 2021</h2>
            <h2 className="footer__link">LinkedIn</h2>
            <h2 className="footer__link">Github</h2>
        </div>
    )
}

export default Footer;
