define(['app/app', 'routes/index_route', 'routes/about_route', 'routes/play_route', 'routes/games_route', 'routes/game_route'], function(App) {
    App.Router.map(function() {
        this.resource('games', function() {
            this.route('game', { path: '/:game' });
        });
        this.resource('play', { path: '/play/:game' }, function() {
        });

        this.route('about');
        this.route('catchall', { path: '/*wildcard'});
    });

    App.Router.reopen({
        location: 'history'
    });
});
