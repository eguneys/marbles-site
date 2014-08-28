define(['ember', 'ember-data'], function(Ember, DS) {
    var App = Ember.Application.create();

    App.ApplicationAdapter = DS.RESTAdapter.extend({
        namespace: 'api/v1',

        ajaxError: function(jqXHR) {
            var error = this._super(jqXHR);

            if (jqXHR && jqXHR.status === 422) {
                var response = Ember.$.parseJSON(jqXHR.responseText);
                var errors = {};

                if (response.errors !== null) {
                    var jsonErrors = response.errors;
                    Ember.keys(jsonErrors).forEach(function(key) {
                        errors[Ember.String.camelize(key)] = jsonErrors[key];
                    });
                }

                return new DS.InvalidError(errors);
            } else {
                return error;
            }
        }
    });

    App.FlashMessageController = Ember.FlashMessageController;
    
    return App;
});
