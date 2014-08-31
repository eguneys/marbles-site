define(['ember', 'app/app'], function(Ember, App) {
    App.VoteGameComponent = Ember.Component.extend({
        showResults: false,
        
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
        }.property('poll.choices'),
        
        actions: {
            vote: function(choice) {
                var choices = this.get('poll.choices');
                var vote = this.get('newVote');
                
                vote.set('choice', choices.findBy('id', '' + choice));
                
                var self = this;
                
                vote.save().then(function(vote) {
                    self.send('showResults');
                }, function(vote) {
                    self.send('showResults');
                });
            },

            showResults: function() {
                this.get('poll').reload().then(function() {
                    this.set('showResults', true);
                }.bind(this));
            },

            hideResults: function() {
                this.set('showResults', false);
            }
        }
    });
});
