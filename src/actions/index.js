import CryptoJS from 'crypto-js';
import Rest from 'lib/Rest';
import Item from 'lib/Item';

export const SAVE_ITEM = 'SAVE_ITEM';
export const saveItem = (item) => {
    return {type: SAVE_ITEM, item}
}

export const MODIFY_ITEM = 'MODIFY_ITEM';
export const modifyItem = (item) => {
    return {type: MODIFY_ITEM, item}
}

export const CANCEL_ITEM = 'CANCEL_ITEM';
export const cancelItem = (item) => {
    return {type: CANCEL_ITEM, item}
}

export const DELETE_ITEM = 'DELETE_ITEM';
export const deleteItem = (item) => {
    return {type: DELETE_ITEM, item}
}

export const REQUEST_DB = 'REQUEST_DB';
export const requestDb = (url, pw) => {
    return {type: REQUEST_DB, url, pw}
}

export const RECEIVE_DB = 'RECEIVE_DB';
export const receiveDb = (db, error=null) => {
    return {type: RECEIVE_DB, db, error }
}

export const POSTED_DB = 'POSTED_DB';
export const postedDb = (error=null) => {
    return {type: POSTED_DB, error}
}

export const META_DB = 'META_DB';
export const metaDb = (name, pw) => {
    return {type: META_DB, name, pw}
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

        data = CryptoJS.AES.decrypt(data, pw);
        data = data.toString(CryptoJS.enc.Utf8);

        try {
            let db = JSON.parse(data);
            if (!db.hasOwnProperty('name')) {
                throw 'Invalid JSON format - missing database name'; }
            if (!db.hasOwnProperty('items')) {
                throw 'Invalid JSON format - missing database items'; }
            if (!Array.isArray(db.items)) {
                throw 'Invalid JSON format - invalid database items format'; }


            // generate unique keys (starting from 1)
            db.counter = 1;
            db.items = db.items.map((item) => {
                let itemObj = new Item(item);
                itemObj.id = db.counter;
                db.counter++;
                return itemObj;
            });

            console.log(db);

            // dispatch data 
            dispatch(receiveDb(db));

        } catch (e) {
            dispatch(receiveDb(null, e));
        }

    }
}

export function saveDb(pdb) {

    return async function (dispatch) {

        dispatch(requestDb(pdb.url, pdb.pw));

        let data = {
            name: pdb.name,
            items: pdb.items.map(i => { return i.toJSON()})
        }

        try {
            let encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), pdb.pw);

            await Rest.post(pdb.url, encrypted)

            // dispatch data 
            dispatch(postedDb());

        } catch (e) {
            dispatch(postedDb(e));
        }
    }
}

