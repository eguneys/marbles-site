define(['ember', 'app/app'], function(Ember, App) {
    App.PlayIndexController = Ember.ObjectController.extend({
        needs: ['flashMessage'],
        
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
            if (progress <= this.get('loadProgress')) {
                progress += 10;
            }
            this.set('loadProgress', progress);
        },

        onGameLoadCompleteCallback: function() {
            this.set('loadProgress', 100);
        },

        onPlayerScoredCallback: function(points, color) {
            console.log(color);
        },

        onPlayerWinCallback: function() {
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
                if (this.get('isPlaying')) {
                    this.get('game').destroy();
                    this.set('isPlaying', false);
                    // remove canvas manually
                    $('#game-area').html('');
                }
            },

            feedbackOk: function() {
                var flashMessage = this.get('controllers.flashMessage');
                flashMessage.set('message', { 'type': 'alert-success',
                                              'title': 'Well Done!',
                                              'body': 'Thanks for the feedback.'});
            },

            feedbackFail: function() {
                var flashMessage = this.get('controllers.flashMessage');
                flashMessage.set('message', { 'type': 'alert-danger',
                                              'title': 'Sorry!',
                                              'body': 'Try submitting again.'});
            },

            voteGame: function(choice) {
                var choices = this.get('model.poll.choices');

                var vote = this.store.createRecord('vote', {
                    choice: choices.findBy('id', '' + choice)
                });

                var self = this;
                
                vote.save().then(function(vote) {
                    self.send('showResults');
                }, function(vote) {
                    self.send('showResults');
                });
            }
        }
    });
});
