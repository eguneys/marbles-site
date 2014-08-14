define(['ember-data', 'app/app', 'models/poll_model'], function(DS, App) {
    App.Game = DS.Model.extend({
        slug: DS.attr('string'),
        name: DS.attr('string'),
        description: DS.attr('string'),
        poll: DS.belongsTo('poll')
    });

    App.GameSerializer = DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
        attrs: {
            poll: { embedded: 'always' }
        }
    });
});
