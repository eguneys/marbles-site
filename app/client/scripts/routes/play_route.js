define(['ember', 'app/app', 'templates/play'], function(Ember, App) {

    App.PlayRoute = Ember.Route.extend({
        renderTemplate: function() {
            return new Ember.RSVP.Promise(function(resolve) {
                require(['vendor/marbles/lym'], function(lym) {
                    var game = new lym.app({
                        parent: 'game-area',
                        paths: {
                            sprites: '/public/assets/vendor/marbles/data/images/sprites'
                        }
                    });
                    game.start();
                    
                    resolve();
                });
            });
        }
    });
});
