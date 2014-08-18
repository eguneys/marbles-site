define(['ember', 'app/app'], function(Ember, App) {

    App.AboutController = Ember.ObjectController.extend({
        actions: {
            submitFeedback: function() {
                $.post('/api/v1/feedback', {
                    email: this.get('email'),
                    subject: this.get('subject'),
                    message: this.get('message')
                }).then(function() {
                    console.log('ok');
                }, function(err) {
                    console.log('fail' + err);
                });
            }
        }
    });
});
