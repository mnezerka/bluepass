import {CALL_API} from 'redux-api-middleware';
import {logout} from 'actions/Auth';

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

export const DB_AUTH_SUCCESS = 'DB_AUTH_SUCCESS';
export const DB_AUTH_FAIL = 'DB_AUTH_FAIL';

export function authenticateDb(password) {
    return (dispatch, getState) => {
        if (getState().db.data == '') {
            dispatch({
                type: DB_AUTH_SUCCESS,
                payload: {password}
            });
        }

    }

}

