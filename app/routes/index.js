var db = require('../models');

module.exports = function(express) {
    var router = express.Router();

    router.get('/polls', function(req, res) {
        db.Poll.findAll({
            include: [{ model: db.Choice, as: 'choices' }]
        }).success(function(polls) {
            res.send({
                polls: polls
            });
        });
    });

    router.get('/poll/:id', function(req, res) {
        db.Choice.findAll({
            where: { PollId: req.params['id'] },
            include: [{model: db.Vote, as: 'votes' }]
        }).success(function(votes) {
            res.send({
                choices: votes
            });
        });
    });

    router.post('/vote/:choice_id', function(req, res) {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var choice = req.params['choice_id'];
        
        db.Vote.addVote(ip, choice, function(err, vote) {
            if (err) {
                res.send({ error: err });
            } else {
                res.send({ success: vote });
            }
        });
    });
    
    return router;
};
