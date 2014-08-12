define(['ember', 'app/app'], function(Ember, App) {
    App.GamesController = Ember.ObjectController.extend({
        showResults: false,

        lymChoices: [
            {text: 'Improve AI', 'vote-percent': "50"},
            {text: 'Multiplayer', 'vote-percent': "89"},
            {text: 'Modern Art', 'vote-percent': "10"}
        ],
        
        actions: {
            vote: function(choice) {

                var self = this;

                // first poll is lym
                var poll = this.store.find('poll', 1)
                        .then(function(poll) {

                            var vote = this.store.createRecord('vote', {
                                choice: poll.get('choices').objectAt(choice)
                            });

                            vote.save().then(function(vote) {
                                //console.log('success ' + vote);
                                self.send('showResults');
                            }, function(vote) {
                                //console.log(vote.responseText);
                                self.send('showResults');
                            });
                            

                        }.bind(this));
            },

            showResults: function() {
                this.set('showResults', true);
            },

            hideResults: function() {
                this.set('showResults', false);
            }
        }
    });
});
