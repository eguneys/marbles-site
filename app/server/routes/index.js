var fs = require('fs'),
    path = require('path'),
    lodash = require('lodash'),
    express = require('express'),
    bodyParser = require('body-parser');



var publicRouter = express.Router();
var apiRouter = express.Router();

apiRouter.use(bodyParser.json());

fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function(file) {
        var name = file.split('.')[0];
        if (!!name.match(/api-/)) {
            require(path.join(__dirname, file))(apiRouter);
        } else {
            require(path.join(__dirname, file))(publicRouter);
        }
    });

module.exports = {
    apiRouter: apiRouter,
    publicRouter: publicRouter
};

