let nanoajax = require('nanoajax');
let Store = require('./Store');

class Regions extends Store {

    getRegions() {
        return this.__getData('regions');
    }

    getConnections() {
        return this.__getData('regions/connections');
    }

}

export default new Regions();