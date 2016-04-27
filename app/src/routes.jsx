import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from 'containers/App';
import LoginPage from 'pages/Login';
import MainPage from 'pages/Main';
import {requireAuthentication} from 'components/AuthenticatedComponent';

const routes = ( 
    <Route path="/" component={App}>
        <IndexRoute component={requireAuthentication(MainPage)}/>
        <Route path="login" component={LoginPage}/>
    </Route>
);

export default routes;
