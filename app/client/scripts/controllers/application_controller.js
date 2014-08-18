define(['ember', 'app/app'], function(Ember, App) {
    App.ApplicationController = Ember.ObjectController.extend({
        actions: {
            submitNewsletter: function() {
                $.post('/api/v1/newsletter', {
                    email: this.get('email')
                }).then(function() {
                    console.log('ok');
                }, function(err) {
                    console.log('fail' + err);
                });
            }
        }
    });
});
