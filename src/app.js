import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import App from 'components/App';
import {Router, Route, IndexRoute} from 'react-router';
import Home from 'components/Home';
import CreateDb from 'components/CreateDb';
import Opener from 'containers/Opener';
import {hashHistory} from 'react-router'
import pdb from 'reducers';

const loggerMiddleware = createLogger();

const store = createStore(
    pdb,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
);

//store.dispatch(selectSubreddit('reactjs'))
/*store.dispatch(fetchPosts('reactjs')).then(() =>
    console.log(store.getState())
)
*/

render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>         
                <IndexRoute component={Home} /> 
                <Route path="home" component={Home} /> 
                <Route path="create" component={CreateDb} />
                <Route path="open" component={Opener}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'))
