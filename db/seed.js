module.exports = function(db) {
    db.Poll
        .create({
            question: 'lym features'
        }).success(function(poll) {
            db.Choice.bulkCreate([{
                text: 'Improve AI',
                PollId: poll.id
            }, {
                text: 'Multiplayer',
                PollId: poll.id
            }, {
                text: 'Modern Art',
                PollId: poll.id
            }]).success(function(status) {
                console.log('[info] %s :: Poll seed created', new Date());

            });
        });
};
