import Rest from 'lib/Rest';
import CryptoJS from 'crypto-js';

export default class BluePassDb {

    constructor() {
        this.name = 'BluePass Database';

        this.data = {
            items: []
        };
    }

    add(item) {
        this.data.items.push(item);
    }

    async loadFromUrl(url, pw) {
        console.log('loadFromUrl', url, pw)
        //#let strDecrypted = CryptoJS.AES.decrypt(str, 'mypass');
        //this._data = JSON.parse(strDecrypted);
        let data = await Rest.get(url);
        console.log(data);

        let dataDecrypted = CryptoJS.AES.decrypt(data, pw);
        console.log('decrypted data', dataDecrypted);
        //#JSON.parse(data);
    }

    loadFromString(str) {
        console.log('loadFromString', str)
        let strDecrypted = CryptoJS.AES.decrypt(str, 'mypass');
        this.data = JSON.parse(strDecrypted);
    }

    saveToString() {
        let str = JSON.stringify(this.data);
        let encrypted = CryptoJS.AES.encrypt(str, 'mypass');
        return encrypted;
    }
}
