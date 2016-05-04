export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];

        return reducer
            ? reducer(state, action.payload, action.meta, action.error)
            : state;
    };
}

export function guid()
{
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c === 'x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

// export database to midnight hotlist format
export function dbExportMindnightCommander(items) {
    let result = [];
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let line = `ENTRY "${item.name}" URL "ftp://${item.login}:${item.secret}@${item.address}"`
        //ENTRY "vbox-prv" URL "sh://adminuser@localhost:2222/home/adminuser"
        result.push(line);
    }
    return result.join('\n');
}
