define(['jquery', 'ember', 'app/app', 'bootstrap/popover'], function($, Ember, App) {
    App.PopoverLinkComponent = Ember.Component.extend({
        // TODO is this correct hook to use
        didInsertElement: function() {
            $('.popover-dismiss').popover({
                trigger: 'hover',
                placement: 'top'
            });
        }
    });
});
