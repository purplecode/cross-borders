import express from 'express';
import Data from '../loader/Data'

let onError = (res) => {
    return (e) => {
        console.log(e);
        console.log(e.stack);
        res.status(500).send(e);
    };
};

module.exports = (config) => {

    let router = express.Router();

    router.get('/', function (req, res) {
        res.render('index');
    });

    router.get('/api/v1/users', function (req, res) {
        res.send(Data.getData().users);
    });


    router.get('/api/v1/users/connections', function (req, res) {
        res.send(Data.getData().usersConnections);
    });

    router.get('/api/v1/regions', function (req, res) {
        res.send(Data.getData().regions);
    });

    router.get('/api/v1/regions/connections', function (req, res) {
        res.send(Data.getData().regionConnections);
    });

    return router;
};
