define(['ember', 'app/app', 'models/game_model', 'controllers/games_controller', 'templates/games'], function(Ember, App) {

    App.GamesRoute = Ember.Route.extend({
        model: function() {
            return this.store.find('game');
        }
    });
    
});
