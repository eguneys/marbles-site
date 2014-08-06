define(['ember', 'app/app'], function(Ember, App) {
    App.PlayIndexController = Ember.ObjectController.extend({
        game: null,

        isPlaying: false,

        onGameEndCallback: function(levelData) {
            this.game.goFullScreen();
        },

        onGameQuitCallback: function(levelData) {
            this.send('quitGame');
        },
        
        actions: {
            startGame: function() {
                this.set('isPlaying', true);
                this.game.start();
            },
            fullscreen: function() {
                this.game.goFullScreen();
            },
            setVolume: function() {
                this.game.config.setSfxVolume(0.5);
            },
            quitGame: function() {
                this.set('isPlaying', false);
                this.game.destroy();
                window.location.reload(true);
            }
        }
    });
});
