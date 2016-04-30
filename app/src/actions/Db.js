import {CALL_API} from 'redux-api-middleware';
import {logout} from 'actions/Auth';
import {Base64} from 'js-base64';

export const DB_FETCH = 'DB_FETCH';
export const DB_FETCH_SUCCESS = 'DB_FETCH_SUCCESS';
export const DB_FETCH_FAIL = 'DB_FETCH_FAIL';

export function fetchDb() {
    return (dispatch, state) => {
        let token = state().auth.token;

        dispatch({[CALL_API]: {
            endpoint: config.api + '/db',
            method: 'GET',
            headers: {Authorization: 'BP ' + token},
            types: [
                DB_FETCH,
                DB_FETCH_SUCCESS,
                DB_FETCH_FAIL,
            ]
        }}).then((action) => {
            // handle automatic logout on token expiration
            if (action.type === DB_FETCH_FAIL && action.payload.status === 403) {
                dispatch(logout());
            }
        });
    }
}

export const DB_UNLOCK_SUCCESS = 'DB_UNLOCK_SUCCESS';
export const DB_UNLOCK_FAIL = 'DB_UNLOCK_FAIL';

export function unlockDb(password) {
    return (dispatch, getState) => {
        if (getState().db.dataRaw == '') {
            dispatch({
                type: DB_UNLOCK_SUCCESS,
                payload: {password, data: []}
            });
        } else {
            // TODO: try to decrypt data using password
        }

    }

}

export const DB_LOCK = 'DB_LOCK';
export const DB_LOCK_SUCCESS = 'DB_LOCK_SUCCESS';
export const DB_LOCK_FAIL = 'DB_LOCK_FAIL';

export function lockDb() {
    return (dispatch, getState) => {
        let token = getState().auth.token;
        let body = JSON.stringify({data: Base64.encode(getState().db.data)});

        dispatch({[CALL_API]: {
            endpoint: config.api + '/db',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'BP ' + token
            },
            body,
            credentials: 'include',
            types: [
                DB_LOCK,
                DB_LOCK_SUCCESS,
                DB_LOCK_FAIL,
            ]
        }}).then((action) => {
            // handle automatic logout on token expiration
            if (action.type === DB_LOCK_FAIL && action.payload.status === 403) {
                dispatch(logout());
            }
        });
    }

}

export const DB_ADD_ITEM = 'DB_ADD_ITEM';

export function addItem(item) {
    return (dispatch, getState) => {
        dispatch({
            type: DB_ADD_ITEM,
            payload: item
        });
    }

}
