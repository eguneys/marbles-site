define(['ember', 'app/app', 'ember-flash-message'], function(Ember, App) {
    App.FeedBackComponent = Ember.Component.extend({
        email: '',
        subject: '',
        message: '',
        
        resetContactForm: function() {
            this.set('email', '');
            this.set('subject', '');
            this.set('message', '');
        },
        
        actions: {
            submitFeedback: function() {
                var flashMessage = this.get('controllers.flashMessage');

                var ctrl = this;
                
                $.post('/api/v1/feedback', {
                    email: this.get('email'),
                    subject: this.get('subject'),
                    message: this.get('message')
                }).then(function() {
                    ctrl.sendAction('submitOk');
                    ctrl.resetContactForm();
                }, function(err) {
                        ctrl.sendAction('submitFail');
                });
            }
        }
    });
});
