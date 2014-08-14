module.exports = function(db) {
    db.Game.create({
        slug: 'lose-your-marbles',
        name: 'Lose your marbles',
        description: 'Match and destroy, marbles.'
    }).success(function(game) {
        
        db.Poll
            .create({
                question: 'lym features',
                GameId: game.id
            }).success(function(poll) {
                db.Choice.bulkCreate([{
                    id: 1,
                    text: 'Improve AI',
                    description: 'More challenging levels',
                    PollId: poll.id
                }, {
                    id: 2,
                    text: 'Multiplayer',
                    description: 'Play online with friends',
                    PollId: poll.id
                }, {
                    id: 3,
                    text: 'Modern Art',
                    description: 'New, fancy interface and gameplay',
                    PollId: poll.id
                }]).success(function(status) {
                    console.log('[info] %s :: Poll seed created', new Date());

                });
            });
    });
};
