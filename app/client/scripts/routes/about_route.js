define(['ember', 'app/app', 'controllers/about_controller'], function(Ember, App) {

    App.Feedback = Ember.Object.extend({
        email: '',
        subject: '',
        message: ''
    });

    App.AboutRoute = Ember.Route.extend({
        model: function() {
            return App.Feedback.create();
        }
    });
});
