
export const PageSizeItems = [
    { id: 10, title: '10' },
    { id: 20, title: '20' },
    { id: 50, title: '50' },
    { id: 100, title: '100' }
]; 

export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];

        return reducer
            ? reducer(state, action.payload, action.meta, action.error)
            : state;
    };
}

export function parseJSON(response) {
    return response.json()
}

export function formatTimeDuration(duration, units='ms') {

    if (duration === null) {
        return 'N/A';
    }

    if (duration < 0) {
        return 'ERROR';
    }
 
    if (units === 's') {
        duration *= 1000;
    }
 
    let ms = duration;
    let result = '';
 
    let hour = Math.floor(ms / 3600000);
    if (hour > 0) {
        result += leftPad(hour, 2) + 'h ';
        ms -= hour * 3600000;
    }
    let min = Math.floor(ms / 60000);
    if (min > 0 || hour > 0) {
        result += leftPad(min, 2) + 'm ';
        ms -= min * 60000;
    }
    let sec = Math.floor(ms / 1000);
    if (sec > 0 || hour > 0 || min > 0) {
        result += leftPad(sec, 2) + 's ';
        ms -= sec * 1000;
    }
    return result;
}

export function formatMspaVersion(version) {
    if (version === null) {
        return 'N/A';
    }

    let major = Math.floor(version / 10000);
    let minor = Math.floor((version - (major * 10000)) / 100);
    let revision = version - (minor * 100);

    return `${major}.${minor}.${revision}`;  
}

function leftPad(n, width, z='0') {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}



