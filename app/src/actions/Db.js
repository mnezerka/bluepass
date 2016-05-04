import CryptoJS from 'crypto-js';
import {CALL_API} from 'redux-api-middleware';
import {logout} from 'actions/Auth';
import {Base64} from 'js-base64';
import {guid} from 'utils';

export const DB_FETCH = 'DB_FETCH';
export const DB_FETCH_SUCCESS = 'DB_FETCH_SUCCESS';
export const DB_FETCH_FAIL = 'DB_FETCH_FAIL';
export function fetchDb() {
    return (dispatch, state) => {
        let token = state().auth.token;

        dispatch({[CALL_API]: {
            endpoint: config.api + 'db',  //eslint-disable-line no-undef
            method: 'GET',
            headers: {'Authorization-bp': 'BP ' + token},
            types: [
                DB_FETCH,
                DB_FETCH_SUCCESS,
                DB_FETCH_FAIL,
            ]
        }}).then((action) => {
            // handle automatic logout on token expiration
            if (action.type === DB_FETCH_FAIL && action.payload.status === 403) {
                dispatch(logout());
            } else {
                dispatch(unlockDb('michal'));
            }
        });
    }
}

export const DB_SAVE = 'DB_SAVE';
export const DB_SAVE_SUCCESS = 'DB_SAVE_SUCCESS';
export const DB_SAVE_FAIL = 'DB_SAVE_FAIL';
// JSON -> string -> encrypt -> base64 -> JSON.data
export function saveDb() {
    return (dispatch, getState) => {
        let state = getState();
        let dataStr = JSON.stringify(state.db.data);
        let dataEncrypted = CryptoJS.AES.encrypt(dataStr, state.db.password);
        let dataRaw = Base64.encode(dataEncrypted);
        let body = JSON.stringify({data: dataRaw});

        dispatch({[CALL_API]: {
            endpoint: config.api + 'db',    //eslint-disable-line no-undef
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization-bp': 'BP ' + state.auth.token 
            },
            body,
            credentials: 'include',
            types: [
                DB_SAVE,
                {
                    type: DB_SAVE_SUCCESS,
                    meta: {dataRaw}
                },
                DB_SAVE_FAIL,
            ]
        }}).then((action) => {
            // handle automatic logout on token expiration
            if (action.type === DB_SAVE_FAIL && action.payload.status === 403) {
                dispatch(logout());
            }
        });
    }
}


export const DB_UNLOCK_SUCCESS = 'DB_UNLOCK_SUCCESS';
export const DB_UNLOCK_FAIL = 'DB_UNLOCK_FAIL';
export function unlockDb(password) {
    return (dispatch, getState) => {
        if (getState().db.dataRaw === null) {
            return;
        }

        if (getState().db.dataRaw === '') {
            dispatch({
                type: DB_UNLOCK_SUCCESS,
                payload: {password, data: []}
            });
        } else {
            let dataEncrypted = Base64.decode(getState().db.dataRaw)
            let dataDecrypted = CryptoJS.AES.decrypt(dataEncrypted, password);
            let dataStr = dataDecrypted.toString(CryptoJS.enc.Utf8)
            let data = JSON.parse(dataStr);

            // normalize data items
            for (let i = 0; i < data.length; i++) {
                if (!('login' in data[i])) {
                    data[i].login = '';
                }
            }

            dispatch({
                type: DB_UNLOCK_SUCCESS,
                payload: {password, data}
            });
        }
    }
}

export const DB_LOCK = 'DB_LOCK';
export function lockDb() {
    return (dispatch) => {
        dispatch({type: DB_LOCK});
    }
}

export const DB_SAVE_ITEM = 'DB_SAVE_ITEM';
export function saveItem(item) {
    // generate item id if item is new
    if (item.id === null || item.id === undefined) {
        item.id = guid();
    }


    return (dispatch) => {
        dispatch({
            type: DB_SAVE_ITEM,
            payload: item
        }).then(() => {
            dispatch(saveDb());
        });
    }

}

export const DB_DELETE_ITEM = 'DB_DELETE_ITEM';
export function deleteItem(id) {
    // generate item id if item is new
    if (id !== null && id !== undefined) {
        return (dispatch) => {
            dispatch({
                type: DB_DELETE_ITEM,
                payload: id
            }).then(() => {
                dispatch(saveDb());
            });
        }
    }

}
