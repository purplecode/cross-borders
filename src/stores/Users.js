let nanoajax = require('nanoajax');
let Store = require('./Store');

class Users extends Store {

    getUsers() {
        return this.__getData('users');
    }

    getConnections() {
        return this.__getData('users/connections');
    }

}

export default new Users();
