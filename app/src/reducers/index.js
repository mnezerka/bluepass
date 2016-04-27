import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux';
import Db from './Db'
import Auth from './Auth';

const pdbApp = combineReducers({
    auth: Auth,
    db: Db,
    routing: routerReducer
})

export default pdbApp
