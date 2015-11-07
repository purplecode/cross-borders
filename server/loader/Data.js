import _ from 'lodash';

function randomString(n) {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < n; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function generateUser(n) {
    var id = randomString(n || 1);
    return {
        id: id,
        region: id[0]
    };
}

function generateUsers(n) {
    return new Array(n).join().split(',').map(function () {
        return generateUser(4);
    });
}

function generateConnections(users) {
    var result = [];
    users.forEach(function (user1) {
        users.forEach(function (user2) {
            result.push({
                x: user1,
                y: user2,
                count: Math.floor(Math.random() * 100)
            });
        });
    });
    return result;
}

function getRegionConnections(usersConnections) {
    var cache = {};
    usersConnections.forEach(function (connection) {
        var path = connection.x.region + '.' + connection.y.region;
        _.set(cache, path, _.get(cache, path, 0) + connection.count);
    });

    var result = [];
    for (var region1 in cache) {
        for (var region2 in cache[region1]) {
            result.push({
                x: region1,
                y: region2,
                count: cache[region1][region2]
            });
        }
    }
    return result;
}

export default {
    getData: function () {
        var users = generateUsers(10);
        var connections = generateConnections(users);
        return {
            users: users,
            usersConnections: connections,
            regions: _.uniq(_.pluck(users, 'region')),
            regionConnections: getRegionConnections(connections)
        };
    }
};
