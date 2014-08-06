define(['ember', 'app/app'], function(Ember, App) {
    App.PlayIndexController = Ember.ObjectController.extend({
        game: null,

        onGameEndCallback: function(levelData) {
            this.game.goFullScreen();
        },
        
        actions: {
            fullscreen: function() {
                this.game.goFullScreen();
            },
            setVolume: function() {
                this.game.config.setSfxVolume(0.5);
            }
        }
    });
});
