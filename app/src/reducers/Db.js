import {createReducer} from 'utils';
import {DB_FETCH, DB_FETCH_SUCCESS, DB_UNLOCK_SUCCESS, DB_LOCK, DB_LOCK_SUCCESS, DB_ADD_ITEM} from 'actions/Db';
import {LOGOUT_USER} from 'actions/Auth';

const initialState = {
    dataRaw: null,
    data: null,
    isFetching: false,
    isLocked: true,
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
            dataRaw: payload.data,
            isFetching: false
        });
    },

    [DB_UNLOCK_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isLocked: false,
            data: payload.data,
            password: payload.password
        });
    },

    [DB_LOCK]: (state) => {
        return Object.assign({}, state, {
            isLocked: true,
        });
    },


    [DB_LOCK_SUCCESS]: (state, payload, meta) => {
        return Object.assign({}, state, {
            dataRaw: meta.dataRaw
        });
    },

    [DB_ADD_ITEM]: (state, payload) => {
        let newData = state.data.slice()
        newData.push(payload);
        console.log(state.data, state.data.slice(), newData);
        return Object.assign({}, state, {
            data: newData
        });
    },

    [LOGOUT_USER]: (state, payload) => {
        return Object.assign({}, state, initialState);
    },

});
