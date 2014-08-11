var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var Vote = sequelize.define('Vote', {
        ip: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
            },

            addVote: function(ip, choice, callback) {
                // select * from votes, choices, polls where
                // votes.choiceId == choices.id and choices.pollId ==
                // polls.id and polls.id in (select pollId from votes,
                // choices where votes.choiceId == choices.id
                // );
                
                // Vote.find({
                //     where: Sequelize
                //         .and({ ip: ip },
                //              { ChoiceId: choice })
                // })
                    // .success(function(vote) {
                    //     if (!vote) {
                    //         Vote.create({
                    //             ip: ip,
                    //             ChoiceId: choice
                    //         })
                    //         .success(function(vote) {
                    //             callback(null, vote);
                    //         });
                    //     } else {
                    //         callback("Vote already exists");
                    //     }

                
                Poll.findAll({ where: Sequelize.and(
                    {
                        'choices.id': choice
                    },
                    {id: 
                     { in:
                       Sequelize.literal('select pollId from votes, choices where votes.choiceId == choices.id and votes.ip == \'' + ip + '\'')
                     }
                    }),
                               include: [ {
                                   model: Choice, as: 'choices',
                                   include: [{ model: Vote, as: 'votes' }]}]
                             }).success(function(votes) {
                                 console.log(votes);
                                 if (!votes || votes.length === 0) {
                                     Vote.create({
                                         ip: ip,
                                         ChoiceId: choice
                                     })
                                         .success(function(vote) {
                                             callback(null, vote);
                                         });
                                 } else {
                                     callback("Vote already exists");
                                 }
                             });
            }
        }
    });
    
    var Choice = sequelize.define('Choice', {
        text: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Choice.hasMany(models.Vote, { as : 'votes' });
            }
        }
    });
    
    var Poll = sequelize.define('Poll', {
        question: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Poll.hasMany(models.Choice, { as: 'choices' });
            }
        }
    });

    return [Vote, Choice, Poll];
};
