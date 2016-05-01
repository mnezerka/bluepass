import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import {apiMiddleware} from 'redux-api-middleware';
import {loginUserSuccess} from 'actions/Auth';
import {unlockDb} from 'actions/Db';
import rootReducer from 'reducers';
import routes from './routes';

const logger = createLogger();

const routingMiddleware = routerMiddleware(browserHistory);

// Add the reducer to your store on the `routing` key
const store = createStore(
    rootReducer,
    window.__INITIAL_STATE__,
    applyMiddleware(apiMiddleware, thunk, routingMiddleware, logger)
    //applyMiddleware(apiMiddleware, thunk, routingMiddleware)
);

// authentication stuff
let token = localStorage.getItem('token');
if (token !== null) {
    store.dispatch(loginUserSuccess(token));
}

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>{routes}</Router>
    </Provider>
), document.getElementById('app'))
