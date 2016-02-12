import React from 'react';
import Db from 'stores/Db';

export default class Home extends React.Component{
    render() {
        let db = Db.getDb()


        if (db === null) {
            return (<span>Welcome to BluePass</span>)
        } else {
            console.log(db);
            return (<span>Current DB: {db.name}</span>)
        }
    }
}
