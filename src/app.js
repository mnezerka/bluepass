import React from 'react';
import App from 'components/App';
import {Router, Route, IndexRoute} from 'react-router';
import Home from 'components/Home';
import CreateDb from 'components/CreateDb';
import OpenDb from 'components/OpenDb';
import {hashHistory} from 'react-router'

React.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>         
            <IndexRoute component={Home} /> 
            <Route path='home' component={Home} /> 
            <Route path='create' component={CreateDb} />
            <Route path='open' component={OpenDb}/>
        </Route>
    </Router>
), document.getElementById('app'))
