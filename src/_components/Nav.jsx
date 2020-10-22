import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { accountService } from '_services';

function Nav() {
    const [account, setAccount] = useState(null);
    useEffect(() => {
        accountService.account.subscribe(x => setAccount(x));
    }, []);

    // only show nav when logged in
    if (!account) return null;

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                <button className="btn btn-link nav-item nav-link" onClick={accountService.logout}>Logout</button>
            </div>
        </nav>
    );
}

export { Nav }; 