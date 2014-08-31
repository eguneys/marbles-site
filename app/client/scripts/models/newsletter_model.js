define(['ember', 'ember-data', 'app/app'], function(Ember, DS, App) {
    App.Newsletter = DS.Model.extend({
        email: DS.attr('string')
    });

    
    App.Feedback = Ember.Object.extend({
        email: '',
        subject: '',
        message: ''
    });

});
