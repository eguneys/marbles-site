define(['ember', 'app/app'], function(Ember, App) {
    App.GamesController = Ember.ObjectController.extend({
        actions: {
            vote: function(choice) {
                
                var poll = this.store.find('poll', 1)
                        .then(function(poll) {

                            var vote = this.store.createRecord('vote', {
                                choice: poll.get('choices').objectAt(choice)
                            });

                            vote.save().then(function(vote) {
                                console.log('success ' + vote);
                            }, function(vote) {
                                console.log('fail ' + vote);
                            });
                            

                        }.bind(this));
            }
        }
    });
});
