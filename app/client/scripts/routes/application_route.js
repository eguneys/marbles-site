define(['ember', 'app/app', 'controllers/application_controller'], function(Ember, App) {

    App.Newsletter = Ember.Object.extend({
        email: ''
    });
    
    App.ApplicationRoute = Ember.Route.extend({
        model: function() {
            return App.Newsletter.create({});
        }
    });
});
