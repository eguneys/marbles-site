var express = require('express'),
    expressHbs = require('express-handlebars'),
    path = require('path'),
    compression = require('compression');

var app = express();
var routes = require('../app/server/routes');
        
app.set('port', process.env.PORT || 3000);

app.engine('.hbs', expressHbs({ extname: '.hbs',
                                defaultLayout:'main',
                                layoutsDir: 'app/server/views/layouts'}));
app.set('views', path.join(__dirname, '..', 'app', 'server', 'views'));
app.set('view engine', '.hbs');

if ('development' == app.get('env')) {
    app.use(require('connect-livereload')());
}

app.use(compression());

app.use('/', routes.publicRouter);

app.use('/api/v1', routes.apiRouter);

app.use('*', function(req, res) { 
    //res.redirect(301, '/');
    res.render('index');
});

module.exports = app;
