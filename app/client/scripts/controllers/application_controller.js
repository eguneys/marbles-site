define(['ember', 'app/app'], function(Ember, App) {
    App.ApplicationController = Ember.ObjectController.extend({
        email: '',
        
        actions: {
            submitNewsletter: function() {
                // $.post('/api/v1/newsletter', {
                //     email: this.get('email')
                // }).then(function() {


                var newsletter = this.store.createRecord('newsletter', {
                    email: this.get('email')
                });

                var ctrl = this;

                newsletter.save().then(function(newsletter) {
                    $.growl({
                        title: '<strong>Well done!</strong> ',
                        message: 'You are added successfully.&nbsp;&nbsp;&nbsp;'
                    }, { type: 'success'
                       });
                    ctrl.set('email', '');
                }, function(err) {
                    $.growl({
                        title: '<strong>Sorry!</strong> ',
                        message : 'Try submitting again.&nbsp;&nbsp;&nbsp'
                    }, {
                        type: 'danger'
                    });
                });
            }
        }
    });
});
