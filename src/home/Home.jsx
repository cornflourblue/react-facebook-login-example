import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { accountService } from '_services';

function Home() {
    const [mounted, setMounted] = useState(false);
    const [accounts, setAccounts] = useState(null);
    useEffect(() => {
        setMounted(true);
        accountService.getAll().then(x => setAccounts(x));

        return () => setMounted(false);
    }, []);

    function deleteAccount(id) {
        // set isDeleting flag to show spinner
        setAccounts(accounts.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));

        // delete account
        accountService.delete(id).then(() => {
            if (mounted) {
                setAccounts(accounts.filter(x => x.id !== id));
            }
        });
    }

    return (
        <div>
            <h2>You're logged in with React & Facebook!!</h2>
            <p>All accounts from secure api end point:</p>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Facebook Id</th>
                        <th>Name</th>
                        <th>Extra Info</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {accounts && accounts.map(account =>
                        <tr key={account.id}>
                            <td>{account.id}</td>
                            <td>{account.facebookId}</td>
                            <td>{account.name}</td>
                            <td>{account.extraInfo}</td>
                            <td className="text-right" style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`edit/${account.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteAccount(account.id)} className="btn btn-sm btn-danger btn-delete-account" disabled={account.isDeleting}>
                                    {account.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!accounts &&
                        <tr>
                            <td colSpan="5" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { Home };