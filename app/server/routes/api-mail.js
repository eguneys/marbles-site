var db = require('../models');
var Emailer = require('../../../lib/emailer');

var MANDRILL_USERNAME = process.env.MANDRILL_USERNAME,
    MANDRILL_PASSWORD = process.env.MANDRILL_APIKEY;

module.exports = function(router) {
    router.post('/feedback', function(req, res) {
        var data = req.body;

        var emailer = new Emailer({
            to: {
                email: 'emreguneyler@windowslive.com',
                name: 'feedback',
                surname: 'hadioyna'
            },
            subject: 'Feedback from Hadioyna',
            template: 'feedback'
        }, data, {
            host: 'smtp.mandrillapp.com',
            port: '587',            
            auth: {
                user: MANDRILL_USERNAME,
                pass: MANDRILL_PASSWORD
            }
        });

        emailer.send(function(err, result) {
            if (err) {
                res.status(err.responseCode).end();
            } else {
                res.status(200).end();
            }
        });
    });

    router.post('/newsletter', function(req, res) {
        var data = req.body;

        db.Newsletter.addEmail(data.email, function(err, newsletter) {
            if (err) {
                res.status(err.responseCode).end();
            } else {
                res.send(newsletter);
            }
        });
    });
};
