var async = require('async');
var db = require('../models');

module.exports = function(router) {
    router.get('/games', function(req, res) {
        db.Game.findAll({
        }).success(function(games) {
            res.send({
                games: games
            });
        });
    });

    router.get('/games/:slug', function(req, res) {
        var slug = req.params.slug;

        // can't support slugs for now
        //db.Game.findBySlug(db, slug, function(err, game) {
        db.Game.findById(db, slug, function(err, game) {
            if (err) {
                res.send(err);
            } else {
                // TODO duplicated
                async.map(game.poll.choices, function(choice, callback) {
                    db.Vote.findCount(choice.id, function(err, count) {
                        choice.setDataValue('count', count);
                        callback(err, choice);
                    });
                }, function(err, results) {
                    game.poll.setDataValue('choices', results);
                    res.send({
                        game: game
                    });
                });
                //res.send({ game: game });
            }
        });
    });
};
