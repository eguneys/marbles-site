var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var Newsletter = sequelize.define('Newsletter', {
        email: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
            },

            addEmail: function(email, callback) {
                Newsletter.create({
                    email: email
                }).success(function(newsletter) {
                    callback(null, newsletter);
                });
            }
        }
    });

    return Newsletter;
};
