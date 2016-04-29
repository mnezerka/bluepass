import {createReducer} from 'utils';
import {DB_FETCH, DB_FETCH_SUCCESS, DB_AUTH_SUCCESS} from 'actions/Db';

const initialState = {
    data: null,
    isFetching: false,
    isDecrypted: false,
    password: null
};


export default createReducer(initialState, {
    [DB_FETCH]: (state) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    },

    [DB_FETCH_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            data: payload.data,
            isFetching: false
        });
    },

    [DB_AUTH_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isDecrypted: true,
            password: payload.password
        });
    },

});
