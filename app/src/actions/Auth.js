import {CALL_API} from 'redux-api-middleware';
import config from 'config_web_app';
import {push} from 'react-router-redux';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';

export function loginUser(login, password, redirect='/') {
    return (dispatch) => {
        dispatch({[CALL_API]: {
            endpoint: config.api + 'api-token-auth/',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: login, password}),
            credentials: 'include',
            types: [
                LOGIN_USER_REQUEST,
                LOGIN_USER_SUCCESS,
                LOGIN_USER_FAIL
            ]
        }}).then((action) => {
            switch (action.type) {
            case LOGIN_USER_SUCCESS:
                localStorage.setItem('token', action.payload.token);
                dispatch(push(redirect));
                break;
            case LOGIN_USER_FAIL:
                localStorage.removeItem('token');
                break;
            }
        });
    }
}

export function loginUserSuccess(token) {
    localStorage.setItem('token', token);
    return {
        type: LOGIN_USER_SUCCESS,
        payload: { token }
    }
}

export const LOGOUT_USER = 'LOGOUT_USER';
export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER,
        error: false
    }
}

/* COMMENTED TO BE REUSED LATER - LOGIC FOR PROCESSING OF ERRORS
export function loginUser(login, password, redirect="/") {
    return function(dispatch) {
        dispatch(loginUserRequest());
        return fetch(config.api + 'api-token-auth/', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
               body: JSON.stringify({username: login, password})
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    let decoded = jwtDecode(response.token);
                    dispatch(loginUserSuccess(response.token));
                    dispatch(push(redirect));
                } catch (e) {
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            })
    }
}
*/
