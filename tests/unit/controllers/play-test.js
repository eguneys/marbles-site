define(['controllers/play_controller'], function() {
    moduleFor('controller:play-index', 'Play Controller', {
        needs: []
    });
    
    test('exists', function() {
        expect(1);

        var ctrl = this.subject();
        
        ok(ctrl);
        
    });
});
