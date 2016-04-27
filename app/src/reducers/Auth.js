import {createReducer} from 'utils';
import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGOUT_USER} from 'actions/Auth';
import jwtDecode from 'jwt-decode';

const initialState = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
    error: false
};

export default createReducer(initialState, {
    [LOGIN_USER_REQUEST]: (state, payload, meta, error) => {
        if (error) {
            return Object.assign({}, state, {
                isAuthenticated: false,
                isAuthenticating: false,
                statusText: 'Network error',
                error
            });
        } else {
            return Object.assign({}, state, {
                isAuthenticating: true,
                statusText: null,
                error
            });
        }
    },
    [LOGIN_USER_SUCCESS]: (state, payload, meta, error) => {
        return Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: true,
            token: payload.token,
            userName: jwtDecode(payload.token).username,
            userEmail: jwtDecode(payload.token).email,
            statusText: 'You have been successfully logged in.',
            error
        });
    },
    [LOGIN_USER_FAIL]: (state, payload, meta, error) => {
        return Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: false,
            token: null,
            userName: null,
            statusText: payload.statusText,
            error
        });
    },
    [LOGOUT_USER]: (state, payload, meta, error) => {
        return Object.assign({}, state, {
            isAuthenticated: false,
            token: null,
            userName: null,
            statusText: 'You have been logged out.',
            error

        });
    }
});
