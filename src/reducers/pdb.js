import {REQUEST_DB, RECEIVE_DB, ADD_ITEM} from 'actions';

const item = (state, action) => {
    switch (action.type) {
    case 'ADD_ITEM':
        return {
            name: action.name,
            pw: action.pw,
        }
    case 'TOGGLE_TODO':
        if (state.id !== action.id) {
            return state
        }

        return Object.assign({}, state, {
            completed: !state.completed
        })

    default:
        return state
    }
}

const pdb = (state = { name: '', items: [], modified: false, fetching: false}, action) => {
    switch (action.type) {

    case REQUEST_DB:
        return Object.assign({}, state, {
            fetching: true 
        })

    case RECEIVE_DB:
        return Object.assign({}, state, {
            fetching: false,
            error: action.error,
            name: action.db.name,
            items: action.db.items
        })

    case 'SET_NAME':
        return Object.assign({}, state, {
            name: action.name
        })

    case 'SAVED':
        return Object.assign({}, state, {
            modified: false
        })

    case ADD_ITEM:
        let newItems = [...state.items, item(undefined, action)]
        return Object.assign({}, state, {
            items: newItems,
            modified: true
        })



    case 'TOGGLE_TODO':
        return state.map(t => item(t, action))

    default:
        return state
    }
}

export default pdb
