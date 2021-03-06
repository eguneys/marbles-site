define(['app/app', 'routes/index_route', 'routes/about_route', 'routes/play_route', 'routes/games_route', 'routes/game_route', 'routes/application_route'], function(App) {
    App.Router.map(function() {
        this.resource('games', function() {
            this.route('game', { path: '/:game_id' });
        });
        this.resource('play', { path: '/play/:game_id' }, function() {
        });

        this.route('about');
        this.route('catchall', { path: '/*wildcard'});
        this.route('application');
    });

    App.Router.reopen({
        location: 'history'
    });
});
