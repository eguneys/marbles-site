define(['ember-data', 'app/app'], function(DS, App) {
    App.Newsletter = DS.Model.extend({
        email: DS.attr('string')
    });
});
