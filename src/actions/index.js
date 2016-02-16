import Rest from 'lib/Rest';

export const ADD_ITEM = 'ADD_ITEM';
export const addItem = (name, pw) => {
    return {
        type: 'ADD_ITEM',
        name,
        pw
    }
}

export const REQUEST_DB = 'REQUEST_DB';
export const requestDb = (url, pw) => {
    return {type: REQUEST_DB, url, pw}
}


export const RECEIVE_DB = 'RECEIVE_DB';
export const receiveDb = (db, error=null) => {
    return {type: RECEIVE_DB, db, error }
}

export function loadDb(url, pw) {

    return async function (dispatch) {

        // First dispatch: the app state is updated to inform
        // that the API call is starting.
        dispatch(requestDb(url, pw));

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        let data = await Rest.get(url);

        try {
            let obj = JSON.parse(data);
            if (!obj.hasOwnProperty('name'))
                throw 'Invalid JSON format - missing database name';
            if (!obj.hasOwnProperty('items'))
                throw 'Invalid JSON format - missing database items';
            if (!Array.isArray(obj.items))
                throw 'Invalid JSON format - invalid database items format';

            // dispatch data 
            dispatch(receiveDb(obj));

        } catch (e) {
            dispatch(receiveDb(null, e));
        }

    }
}

export function saveDb(url, pw, name, items) {

    return async function (dispatch) {

        dispatch(requestDb(url, pw));

        let data = {name, items}
        try {
            await Rest.post(url, JSON.stringify(data));

            // dispatch data 
            dispatch(postedDb());

        } catch (e) {
            dispatch(postedDb(e));
        }
    }
}

export const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    }
}
