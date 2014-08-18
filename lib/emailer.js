var nodemailer = require('nodemailer'),
    path = require('path'),
    fs = require('fs'),
    _ = require('lodash');

function Emailer(options, data, transportOptions) {
    this.options = options;
    this.data = data;
    this.transportOptions = transportOptions;
}

Emailer.prototype.send = function(callback) {
    var options = this.options;
    var html = this.getHtml(options.template, this.data),
        attachments = this.getAttachments(html),
        messageData = {
            to: "'" + options.to.name + " " +
                options.to.surname + "' <" +
                options.to.email + ">",
            from: "no-reply@hadioyna.com",
            subject: options.subject,
            html: html,
            generateTextFromHTML: true,
            attachments: attachments
        };

    var transport = this.getTransport();
    return transport.sendMail(messageData, callback);
};

Emailer.prototype.getTransport = function() {
    return nodemailer.createTransport(this.transportOptions);
};

Emailer.prototype.getHtml = function(templateName, data) {
    var templatePath = '/../app/server/views/emails/' + templateName + '.html',
        templateContent = fs.readFileSync(path.join(__dirname + templatePath), { encoding: 'utf8' });
    return _.template(templateContent, data, { interpolate: /\{\{(.+?)\}\}/g });
};

Emailer.prototype.getAttachments = function(html) {
    var attachments = [];

    for (var attachment in this.attachments) {
        if (html.search('cid:' + attachment.cid) > -1) {
            attachments.push(attachment);
        }
    };
};

module.exports = Emailer;
