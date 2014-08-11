var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var Vote = sequelize.define('Vote', {
        ip: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
            },

            addVote: function(ip, choice, callback) {
                Vote.find({
                    where: Sequelize
                        .and({ ip: ip },
                             { ChoiceId: choice })
                })
                    .success(function(vote) {
                        if (!vote) {
                            Vote.create({
                                ip: ip
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
