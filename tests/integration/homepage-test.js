define(['app/app'], function(App) {
    module('Integration: Homepage', {
        setup: function() {
            App.reset();
        },
        teardown: function() {
        }
    });
    
    test('Heading', function() {
        expect(1);

        visit('/');
        
        andThen(function() {
            equal(find('h3').text().trim(), 'Play Marbles!');
            
        });
    });
});
