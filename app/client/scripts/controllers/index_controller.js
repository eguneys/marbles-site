define(['ember', 'app/app'], function(Ember, App) {

    App.IndexController = Ember.Controller.extend({
        featuredGames: function() {
            return this.get('model');
        }.property('model')
    });
});
