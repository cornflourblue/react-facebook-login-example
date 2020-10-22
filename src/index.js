import React from 'react';
import { Router } from 'react-router-dom';
import { render } from 'react-dom';

// global stylesheet
import './index.css';

import { initFacebookSdk, jwtInterceptor, errorInterceptor, history } from './_helpers';
import { App } from './App';

// setup fake backend
import { fakeBackend } from './_helpers';
fakeBackend();

// enable interceptors for http requests
jwtInterceptor();
errorInterceptor();

// wait for facebook sdk before startup
initFacebookSdk().then(startApp);

function startApp() { 
    render(
        <Router history={history}>
            <App />
        </Router>,
        document.getElementById('app')
    );
}