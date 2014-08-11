define(['ember-data', 'app/app'], function(DS, App) {
    App.Poll = DS.Model.extend({
        question: DS.attr('string'),
        choices: DS.hasMany('choice', {
            embedded: 'always'
        })
    });

    App.Choice = DS.Model.extend({
        text: DS.attr('string'),
        votes: DS.hasMany('vote'),
        poll: DS.belongsTo('poll')
    });

    App.Vote = DS.Model.extend({
        ip: DS.attr('string'),
        choice: DS.belongsTo('choice')
    });

    // http://stackoverflow.com/questions/14320925/how-to-make-embedded-hasmany-relationships-work-with-ember-data
    // http://emberjs.com/api/data/classes/DS.RESTSerializer.html#method_extractSingle
    App.PollSerializer = DS.RESTSerializer.extend({
        extractSingle: function(store, type, payload, id) {
            var poll = payload.poll;
            var choices = poll.choices;
            delete poll.choices;

            poll.choices = [];

            choices.forEach(function(c) {
                poll.choices.push(c.id);
            });
            
            payload = { choices: choices, poll: payload.poll };
            return this._super(store, type, payload, id);
        }
    });
});
