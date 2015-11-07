let nanoajax = require('nanoajax');

export default class Store {

    constructor() {
        this.cache = {};
    }

    __getData(url) {
        return new Promise((resolve) => {
            if (this.cache[url]) {
                return this.cache[url];
            }
            nanoajax.ajax(`/api/v1/${url}`, (code, results) => {
                this.cache[url] = JSON.parse(results);
                resolve(this.cache[url]);
            });
        });
    }
}
