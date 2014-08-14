define(['ember', 'app/app'], function(Ember, App) {
    
    App.GamesGameController = Ember.ObjectController.extend({
        showResults: false,

        poll: function() {
            return this.get('model.poll');
        }.property('model'),
        
        pollChoices: function() {
            var choices = this.get('poll.choices');
            
            var totalVotes = choices.reduce(function(prev, item) {
                return prev + item.get('count');
            }, 0);
            
            choices.map(function(item) {
                var votePercent = (item.get('count') / totalVotes) * 100;
                item.set('vote-percent', votePercent.toFixed(2));
                return item;
            });
            return choices;
        }.property('poll'),
        
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
