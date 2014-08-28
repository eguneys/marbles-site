var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var Newsletter = sequelize.define('Newsletter', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        }
    }, {
        classMethods: {
            associate: function(models) {
            },

            addEmail: function(email, callback) {
                Newsletter.create({
                    email: email
                }).success(function(newsletter) {
                    callback(null, newsletter);
                }).error(function(error) {
                    callback(error);
                });
            }
        }
    });

    return Newsletter;
};
