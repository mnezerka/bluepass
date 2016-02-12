

export class DbStore {

    constructor() {
        this.db = null;
    }

    getDb() {
        return this.db;
    }

}

export default new DbStore();
