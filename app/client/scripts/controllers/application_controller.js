define(['ember', 'app/app'], function(Ember, App) {
    App.ApplicationController = Ember.ObjectController.extend({
        actions: {
            submitNewsletter: function() {
                $.post('/api/v1/newsletter', {
                    email: this.get('email')
                }).then(function() {
                    $.growl({
                        title: '<strong>Well done!</strong> ',
                        message: 'You are added successfully.&nbsp;&nbsp;&nbsp;'
                    }, { type: 'success'
                       });
                }, function(err) {
                    $.growl({
                        title: '<strong>Sorry!</strong> ',
                        message: 'Try submitting again.&nbsp;&nbsp;&nbsp'
                    }, {
                        type: 'danger'
                    });
                });
            }
        }
    });
});
