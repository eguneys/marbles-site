define(['ember', 'app/app', 'controllers/game_controller'], function(Ember, App) {

    App.GamesGameRoute = Ember.Route.extend({
        afterModel: function(model) {
            return model.reload();
        }
    });
});
