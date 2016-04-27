import {createReducer} from 'utils';
/*
import {GATEWAYS_FETCH_DATA, GATEWAYS_FETCH_DATA_SUCCESS} from 'actions/Gateways';
*/
const initialState = {
    data: null,
    isFetching: false
};


export default createReducer(initialState, {
    /*
    [GATEWAYS_FETCH_DATA]: (state) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    },

    [GATEWAYS_FETCH_DATA_SUCCESS]: (state, payload, meta) => {
        return Object.assign({}, state, {
            data: payload.results,
            sortField: meta.sortField,
            sortAsc: meta.sortAsc,
            pageSize: meta.pageSize,
            page: payload.page,
            total: payload.count,
            isFetching: false
        });
    },
    */
});
