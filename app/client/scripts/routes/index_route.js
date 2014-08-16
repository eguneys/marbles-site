define(['ember', 'app/app', 'mixins/lazy_loader_mixin'], function(Ember, App) {

    App.IndexRoute = Ember.Route.extend(App.LazyLoaderMixin, {
        requireLists: ['routes/index_deps'],

        model: function() {
            return this.store.find('game');
        }
    });
});
