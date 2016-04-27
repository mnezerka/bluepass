import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import App from 'components/App';
import {Router, browserHistory} from 'react-router';

/*
import Home from 'components/Home';
import Opener from 'containers/Opener';
import Meta from 'containers/Meta';
import {hashHistory} from 'react-router'
import pdb from 'reducers';
*/

import rootReducer from 'reducers';
import routes from './routes';

const logger = createLogger();

// create routing middleware
const routingMiddleware = routerMiddleware(browserHistory);

// create routing middleware
//const routingMiddleware = routerMiddleware(browserHistory);

// Add the reducer to your store on the `routing` key
const store = createStore(
    rootReducer,
    window.__INITIAL_STATE__,
    //applyMiddleware(apiMiddleware, thunk, routingMiddleware, logger)
    applyMiddleware(apiMiddleware, thunk, routingMiddleware)
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



/*
const store = createStore(
    pdb,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
);*/

//store.dispatch(selectSubreddit('reactjs'))
/*store.dispatch(fetchPosts('reactjs')).then(() =>
    console.log(store.getState())
)
*/

/*/
ReactDOM.render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>         
                <IndexRoute component={Home} /> 
                <Route path="home" component={Home} /> 
                <Route path="open" component={Opener}/>
                <Route path="meta" component={Meta} /> 
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'))
*/

