define(['ember', 'app/app', 'controllers/game_controller'], function(Ember, App) {

    App.GamesGameRoute = Ember.Route.extend({
        model: function(params) {
            return this.store.find('game', params.game);
        }
    });
});
