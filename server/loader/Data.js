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
    var regions = ['Poland', 'England', 'France', 'Russia', 'Germany'];
    return {
        id: id,
        region: regions[Math.floor(Math.random() * regions.length) % regions.length]
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
    return _.sortByOrder(result, ['x', 'count'], ['asc', 'desc']);
}


function getRegions(users, connections) {
    var regions = _.uniq(_.pluck(users, 'region'));
    regions = regions.map((region) => {
        return {
            key: region,
            count: _.sum(_.filter(connections, {x: region}), (connection) => {
                return connection.count
            })
        };
    });
    return _.sortByOrder(regions, 'count', 'desc');
}

export default {
    getData: function () {
        var users = generateUsers(10);
        var usersConnections = generateConnections(users);
        var regionConnections = getRegionConnections(usersConnections);
        return {
            users: users,
            usersConnections: usersConnections,
            regions: getRegions(users, regionConnections),
            regionConnections: regionConnections
        };
    }
};
