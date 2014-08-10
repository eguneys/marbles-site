// set up ===
var express = require('express'),
    expressHbs = require('express-handlebars'),
    path = require('path'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    compression = require('compression');

var app = express();
var router = express.Router();
var apiRouter = require('../app/routes')(express);
        
// configuration ===

app.set('port', process.env.PORT || 3000);

app.engine('.hbs', expressHbs({ extname: '.hbs',
                                defaultLayout:'main',
                                layoutsDir: 'app/views/layouts'}));
app.set('views', path.join(__dirname, '..', 'app', 'views'));
app.set('view engine', '.hbs');


// routes ==
router.use(favicon(path.join(__dirname, '..', 'public', 'assets', 'favicon.ico')));
router.use(morgan("dev", {}));
router.use('/public', express.static(path.join(__dirname, '..', 'public'), { maxAge: 864000000 }));

router.get('/', function(req, res) {
    res.render('index');
});

if ('development' == app.get('env')) {
    app.use(require('connect-livereload')());
}

app.use(compression());

app.use('/', router);

app.use('/api/v1', apiRouter);

app.use('*', function(req, res) { 
    //res.redirect(301, '/');
    res.render('index');
});

module.exports = app;
