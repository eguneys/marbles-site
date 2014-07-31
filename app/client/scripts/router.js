define(['app/app', 'routes/index_route', 'routes/about_route', 'routes/play_route'], function(App) {
    App.Router.map(function() {
        this.resource('games');
        this.resource('play', { path: '/play/:game' }, function() {
        });

        this.route('about');
        this.route('catchall', { path: '/*wildcard'});
    });

    App.Router.reopen({
        location: 'history'
    });
});
