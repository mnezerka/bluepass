import {REQUEST_DB, RECEIVE_DB, POSTED_DB, META_DB, SAVE_ITEM, DELETE_ITEM, MODIFY_ITEM, CANCEL_ITEM} from 'actions';

const INITIAL_STATE = {
    url: '', 
    pw: 'n/a',
    name: 'Empty database',
    items: [],
    modified: false,
    fetching: false,
    counter: 1
}

const item = (state, action) => {
    switch (action.type) {
    case SAVE_ITEM:
        return action.item

    case MODIFY_ITEM:
        if (state.id !== action.item.id) {
            return state
        }
        return Object.assign({}, state, {
            isModified: true
        })

    case CANCEL_ITEM:
        if (state.id !== action.item.id) {
            return state
        }
        return Object.assign({}, state, {
            isModified: false
        })

    default:
        return state
    }
}

const pdb = (state = INITIAL_STATE, action) => {
    switch (action.type) {

    case REQUEST_DB:
        return Object.assign({}, state, {
            fetching: true,
            url: action.url,
            pw: action.pw
        })

    case RECEIVE_DB:
        if (action.db === null) {
            return Object.assign({}, state, {
                error: action.error,
                fetching: false
            })
        }

        return Object.assign({}, state, {
            counter: action.db.counter,
            modified: false,
            fetching: false,
            error: action.error,
            name: action.db.name,
            items: action.db.items
        })

    case POSTED_DB:
        return Object.assign({}, state, {
            modified: false,
            fetching: false,
            error: action.error,
        })

    case META_DB:
        return Object.assign({}, state, {
            name: action.name,
            pw: action.pw
        })

    case SAVE_ITEM: {
        // if item is new
        let newItems = [...state.items]

        action.item.isModified = false;

        if (action.item.id === 0) {
            action.item.id = state.counter;
            state.counter++;
            newItems.push(action.item);
        } else {
            //let newItems = state.items.map((i) => item(i => item(i, action))
            for (let i = 0; i < newItems.length; i++) {
                if (newItems[i].id === action.item.id) {
                    newItems[i] = action.item;
                    break;
                }
            }
        }

        return Object.assign({}, state, {
            items: newItems,
            modified: true
        })
    }

    case DELETE_ITEM: {
        let newItems = state.items.filter(i => { return i.id !== action.item.id;} )
        return Object.assign({}, state, {
            items: newItems,
            modified: true
        })
    }

    case MODIFY_ITEM: {
        let newItems = state.items.map(t => item(t, action));
        console.log(newItems);
        return Object.assign({}, state, {
            items: newItems,
            modified: true
        })
    }

    case CANCEL_ITEM: {
        let newItems = state.items.map(t => item(t, action));
        return Object.assign({}, state, {
            items: newItems,
            modified: true
        })
    }

    default:
        return state
    }
}

export default pdb
