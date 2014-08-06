define(['ember', 'app/app', 'templates/play', 'controllers/play_controller'], function(Ember, App) {

    App.PlayRoute = Ember.Route.extend({
        renderTemplate: function() {
            var ctrl = this.controllerFor('play.index');
            
            return new Ember.RSVP.Promise(function(resolve) {
                require(['vendor/marbles/lym'], function(lym) {
                    var game = new lym.app({
                        parent: 'game-area',
                        paths: {
                            sprites: '/public/assets/vendor/marbles/data/images/sprites',
                            audio: '/public/assets/vendor/marbles/data/audio/sprites'
                        },
                        sfxVolume: 1,
                        musicVolume: 1,
                        onGameEnd: ctrl.get('onGameEndCallback')
                    });
                    game.start();

                    ctrl.set('game', game);
                    
                    resolve();
                });
            });
        }
    });
});
