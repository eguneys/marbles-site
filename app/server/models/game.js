var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define('Game', {
        slug: DataTypes.STRING,
        name: DataTypes.STRING,
        description: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Game.hasOne(models.Poll, { as: 'poll' });
            },

            findBySlug: function(models, slug, callback) {
                Game.find({
                    where: { slug: slug },
                    include: [{
                        model: models.Poll, as: 'poll',
                        include: [{model: models.Choice, as: 'choices'}]
                    }]
                }).success(function(game) {
                    if (!game) {
                        // TODO 
                        callback("Error: bad game");
                    } else {
                        callback(null, game);
                    }
                });
            }
        }
    });

    return Game;
};
