import Rest from 'lib/Rest';
import CryptoJS from 'crypto-js';

export default class BluePassDb {

    constructor() {
        this.name = 'BluePass Database';
        this.url = null;
        this.db = null;

        this.data = {
            items: []
        };
    }

    add(item) {
        this.data.items.push(item);
    }

    async loadFromUrl(url, pw) {
        console.log('DB:loadFromUrl', url, pw)
        //#let strDecrypted = CryptoJS.AES.decrypt(str, 'mypass');
        //this._data = JSON.parse(strDecrypted);
        
        let data = await Rest.get(url);
        console.log('DB: loaded data', data);

        //let dataDecrypted = CryptoJS.AES.decrypt(data, pw);
        //console.log('decrypted data', dataDecrypted);

        try {
            let dbData = this.parseFromJSON(data);
            this.url = url;
            this.pw = pw;
            this.data = dbData;
        } catch (e) {
            console.log('Load database failed', e);
            return;
        }

        return;
    }

    parseFromJSON(jsonString) {
        let obj = JSON.parse(jsonString);
        console.log('DB:parsing', obj);
        if (!obj.hasOwnProperty('name'))
            throw 'Invalid JSON format - missing database name';
        if (!obj.hasOwnProperty('data'))
            throw 'Invalid JSON format - missing database data';
        if (!Array.isArray(obj.data))
            throw 'Invalid JSON format - invalid database format';
    }

    saveToString() {
        let str = JSON.stringify(this.data);
        let encrypted = CryptoJS.AES.encrypt(str, 'mypass');
        return encrypted;
    }
}
