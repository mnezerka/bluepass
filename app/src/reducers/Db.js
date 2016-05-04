import {createReducer} from 'utils';
import {DB_FETCH,
    DB_FETCH_SUCCESS,
    DB_UNLOCK_SUCCESS,
    DB_LOCK,
    DB_SAVE_ITEM,
    DB_DELETE_ITEM,
    DB_SAVE,
    DB_SAVE_SUCCESS} from 'actions/Db';
import {LOGOUT_USER} from 'actions/Auth';

const initialState = {
    dataRaw: null,
    data: null,
    isFetching: false,
    isSaving: false,
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

    [DB_SAVE]: (state) => {
        return Object.assign({}, state, {
            isSaving: true
        });
    },

    [DB_SAVE_SUCCESS]: (state, payload, meta) => {
        return Object.assign({}, state, {
            dataRaw: meta.dataRaw,
            isSaving: false
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
            data: null,
            password: null,
            isLocked: true,
        });
    },

    [DB_SAVE_ITEM]: (state, payload) => {
        let newData = state.data.slice()
        // check if item exists
        let itemPos = null;
        for (let i = 0; i < newData.length; i++) {
            if (payload.id === newData[i].id) {
                itemPos = i;
                break;
            }
        }
        if (itemPos !== null) {
            newData[itemPos] = payload;
        } else {
            newData.push(payload);
        }
        return Object.assign({}, state, {
            data: newData
        });
    },

    [DB_DELETE_ITEM]: (state, idToDel) => {
        let newData = state.data.filter((item) => { return item.id !== idToDel; });
        return Object.assign({}, state, {
            data: newData
        });
    },

    [LOGOUT_USER]: (state) => {
        return Object.assign({}, state, initialState);
    },

});
