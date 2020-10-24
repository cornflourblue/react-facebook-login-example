import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { accountService } from '_services';

function EditAccount({ history, match }) {
    const { id } = match.params;

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, setValue, formState } = useForm();

    // pre-populate form with account details when component loads
    const [account, setAccount] = useState(null);
    useEffect(() => {
        accountService.getById(id).then(account => {
            setAccount(account);
            const fields = ['name', 'extraInfo'];
            fields.forEach(field => setValue(field, account[field]));
        });
    }, [id, setValue]);

    // form submit handler
    const [error, setError] = useState('');
    function onSubmit(data) {
        return accountService.update(id, data)
            .then(() => history.push('..'))
            .catch(err => setError(err));
    }

    return (
        <div>
            <h2>Edit Account</h2>
            <p>Updating the information here will only change it inside this application, it won't (and can't) change anything in the associated Facebook account.</p>
            {account &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Facebook Id</label>
                        <div>{account.facebookId}</div>
                    </div>
                    <div className="form-group">
                        <label>Name</label>
                        <input name="name" type="text" ref={register} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Extra Info</label>
                        <input name="extraInfo" type="text" ref={register} className="form-control" />
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting &&
                                <span className="spinner-border spinner-border-sm mr-1"></span>
                            }
                            Save
                        </button>
                        <Link to=".." className="btn btn-link">Cancel</Link>
                        {error &&
                            <div className="alert alert-danger mt-3 mb-0">{error}</div>
                        }
                    </div>
                </form>
            }
            {!account &&
                <div className="text-center p-3">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                </div>
            }
        </div>
    );
}

export { EditAccount };