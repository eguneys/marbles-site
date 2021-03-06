var fs = require('fs'),
    path = require('path'),
    lodash = require('lodash'),
    Sequelize = require('sequelize'),
    sequelize = null,
    db = {};

if (process.env.NODE_ENV === 'test') {
    console.log('[test] using in memory database');
    sequelize = new Sequelize('marbles-site-db', null, null, {
        dialect: 'sqlite',
        storage: ':memory:'
    });
} else if (process.env.HEROKU_POSTGRESQL_WHITE_URL) {
    var match = process.env.HEROKU_POSTGRESQL_WHITE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);

    sequelize = new Sequelize(match[5], match[1], match[2], {
        dialect: 'postgres',
        protocol: 'postgres',
        port: match[4],
        host: match[3],
        logging: true // false
    });
} else {
    sequelize = new Sequelize('marbles-site-db', null, null, {
        dialect: 'sqlite',
        storage: './db/development.sqlite'
    });
}

fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        if (model instanceof Array) {
            model.forEach(function(m) {
                db[m.name] = m;
            });
        } else {
            db[model.name] = model;
        }
    });

Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

module.exports = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db);
