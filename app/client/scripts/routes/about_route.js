define(['ember', 'app/app', 'models/newsletter_model', 'controllers/about_controller'], function(Ember, App) {

    App.AboutRoute = Ember.Route.extend({
        model: function() {
            return App.Feedback.create();
        }
    });
});
