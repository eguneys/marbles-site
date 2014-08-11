var bodyParser = require('body-parser');

var db = require('../models');

module.exports = function(express) {
    var router = express.Router();

    router.use(bodyParser.json());
    
    router.get('/polls', function(req, res) {
        db.Poll.findAll({
            include: [{ model: db.Choice, as: 'choices' }]
        }).success(function(polls) {
            res.send({
                polls: polls
            });
        });
    });

    router.get('/polls/:id', function(req, res) {

        db.Poll.find({
            where: { id: req.params.id },
            include: [{model: db.Choice, as: 'choices' }]
        }).success(function(poll) {
            res.send({
                poll: poll
            });
        });
    });

    router.post('/votes', function(req, res) {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var choice = req.body.choice;
        
        db.Vote.addVote(ip, choice, function(err, vote) {
            if (err) {
                res.send(err);
            } else {
                res.send({ vote: vote });
            }
        });
    });
    
    return router;
};
