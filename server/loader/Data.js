import _ from 'lodash';

function randomString(n) {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < n; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

var REGIONS = [
    {name: 'Poland', key: 'PL'},
    {name: 'England', key: 'GB'},
    {name: 'France', key: 'FR'},
    {name: 'Russia', key: 'RU'},
    {name: 'Germany', key: 'DE'}
];

function generateUser(n) {
    var username = randomString(n || 1);
    return {
        username: username,
        region: REGIONS[Math.floor(Math.random() * REGIONS.length) % REGIONS.length]
    };
}

function generateUsers(n) {
    return new Array(n).join().split(',').map(function () {
        return generateUser(10);
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
        var path = connection.x.region.key + '.' + connection.y.region.key;
        _.set(cache, path, _.get(cache, path, 0) + connection.count);
    });

    var result = [];
    for (var region1 in cache) {
        for (var region2 in cache[region1]) {
            result.push({
                x: _.first(_.filter(REGIONS, {key: region1})),
                y: _.first(_.filter(REGIONS, {key: region2})),
                count: cache[region1][region2] || 0
            });
        }
    }
    return _.sortByOrder(result, ['x', 'count'], ['asc', 'desc']);
}


function getRegions(users, connections) {
    let regions = REGIONS.map((region) => {
        return _.extend({
            count: _.sum(_.filter(connections, (connection) => {
                return connection.x.key === region.key;
            }), (connection) => {
                return connection.count
            })
        }, region);
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
