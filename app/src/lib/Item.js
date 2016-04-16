export default class Item {
    constructor(obj = null) {
        this.id = 0;
        this.name = 'n/a';
        this.pw = '';
        this.type = '';
        this.isModified = false;

        if (obj !== null && typeof(obj) === 'object') {
            Object.assign(this, obj);
        }
    }

    toJSON() {
        return {
            name: this.name,
            pw: this.pw,
            type: this.type
        };
    }
}

