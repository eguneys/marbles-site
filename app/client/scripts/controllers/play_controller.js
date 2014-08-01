define(['ember', 'app/app'], function(Ember, App) {
    App.PlayIndexController = Ember.ObjectController.extend({
        game: null,
        
        actions: {
            fullscreen: function() {
                this.game.goFullScreen();
            }
        }
    });
});
