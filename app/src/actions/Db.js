import {CALL_API} from 'redux-api-middleware';
import config from 'config_web_app';
import querystring from 'querystring';
import {logout} from 'actions/Auth';

export const GATEWAYS_FETCH_DATA = 'GATEWAYS_FETCH_DATA';
export const GATEWAYS_FETCH_DATA_SUCCESS = 'GATEWAYS_FETCH_DATA_SUCCESS';
export const GATEWAYS_FETCH_DATA_FAIL = 'GATEWAYS_FETCH_DATA_FAIL';

export const GATEWAYS_DSHB_FETCH_DATA = 'GATEWAYS_DSHB_FETCH_DATA';
export const GATEWAYS_DSHB_FETCH_DATA_SUCCESS = 'GATEWAYS_DSHB_FETCH_DATA_SUCCESS';
export const GATEWAYS_DSHB_FETCH_DATA_FAIL = 'GATEWAYS_DSHB_FETCH_DATA_FAIL';

export function fetchGateways(sortField='id', sortAsc=true, pageSize=50, page=1) {
    return fetchGatewaysData(
        sortField,
        sortAsc,
        GATEWAYS_FETCH_DATA,
        GATEWAYS_FETCH_DATA_SUCCESS,
        GATEWAYS_FETCH_DATA_FAIL,
        pageSize,
        page);
}

export function fetchGatewaysDashboard(sortField='id', sortAsc=true, pageSize=10, page=1) {
    return fetchGatewaysData(
        sortField,
        sortAsc,
        GATEWAYS_DSHB_FETCH_DATA,
        GATEWAYS_DSHB_FETCH_DATA_SUCCESS,
        GATEWAYS_DSHB_FETCH_DATA_FAIL,
        pageSize,
        page);
}

function fetchGatewaysData(sortField='id', sortAsc=true, actFetch, actSuccess, actFail, pageSize=null, page=null) {
    return (dispatch, state) => {
        let token = state().auth.token;

        let urlParams = {
            ordering: `${sortAsc ? '' : '-'}${sortField}`
        };

        if (pageSize !== null) {
            urlParams.page_size = pageSize;
        }

        if (page !== null) {
            urlParams.page = page;
        }

        dispatch({[CALL_API]: {
            endpoint: config.api + 'gateways/?' + querystring.stringify(urlParams),
            method: 'GET',
            headers: {Authorization: 'Bearer ' + token},
            types: [
                actFetch,
                {
                    type: actSuccess,
                    meta: { sortField, sortAsc, pageSize}
                },
                actFail 
            ]
        }}).then((action) => {
            // handle automatic logout on token expiration
            if (action.type === actFail && action.payload.status === 403) {
                dispatch(logout());
            }
        });
    }
}
