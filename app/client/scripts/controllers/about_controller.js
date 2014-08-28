define(['ember', 'app/app'], function(Ember, App) {

    App.AboutController = Ember.ObjectController.extend({
        needs: ['flashMessage'],
        
        actions: {
            submitFeedback: function() {
                var flashMessage = this.get('controllers.flashMessage');
                        
                $.post('/api/v1/feedback', {
                    email: this.get('email'),
                    subject: this.get('subject'),
                    message: this.get('message')
                }).then(function() {
                    flashMessage.set('message', { 'type': 'alert-success',
                                                'title': 'Well done!',
                                                'body': 'Thanks for your feedback.'});
                }, function(err) {
                    flashMessage.set('message', { 'type': 'alert-danger',
                                                'title': 'Sorry!',
                                                'body': 'Try submitting again.'});
                });
            }
        }
    });
});
