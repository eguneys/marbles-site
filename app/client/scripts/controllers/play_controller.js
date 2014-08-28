define(['ember', 'app/app'], function(Ember, App) {
    App.PlayIndexController = Ember.ObjectController.extend({
        game: null,

        isLoading: function() {
            return this.get('game') === null;
        }.property('game'),
        
        isPlaying: false,

        loadProgress: 0,

        hideProgressBar: function() {
            return !this.get('isPlaying') || this.get('loadProgress') >= 100;
        }.property('loadProgress', 'isPlaying'),
        
        onGameEndCallback: function(levelData) {
            this.game.goFullScreen();
        },

        onGameQuitCallback: function(levelData) {
            this.send('quitGame');
        },

        onGameLoadUpdateCallback: function(progress) {
            this.set('loadProgress', progress);
        },

        onGameLoadCompleteCallback: function() {
            this.set('loadProgress', 100);
        },
        
        actions: {
            startGame: function() {
                this.set('isPlaying', true);
                this.get('game').start();
            },
            fullscreen: function() {
                this.get('game').goFullScreen();
            },
            setVolume: function() {
                this.get('game').config.setSfxVolume(0.5);
            },
            quitGame: function() {
                this.set('isPlaying', false);
                this.get('game').destroy();
                //window.location.reload(true);
            }
        }
    });
});
