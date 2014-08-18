var path = require('path'),
    express = require('express'),
    favicon = require('serve-favicon'),
    morgan = require('morgan');


module.exports = function(router) {

    router.use(favicon(path.join(__dirname, '../../../', 'public', 'assets', 'favicon.ico')));
    router.use(morgan("dev", {}));
    router.use('/public', express.static(path.join(__dirname, '../../../', 'public'), { maxAge: 24 * 60 * 60 * 1000 }));

    router.get('/', function(req, res) {
        res.render('index');
    });

    return router;
};
