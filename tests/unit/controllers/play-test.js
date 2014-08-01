define(['controllers/play_controller'], function() {
    moduleFor('controller:play', 'Play Controller', {
        needs: []
    });
    
    test('exists', function() {
        expect(1);

        var ctrl = this.subject();
        
        ok(ctrl);
        
    });
});
