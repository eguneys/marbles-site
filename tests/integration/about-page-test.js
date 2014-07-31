define(['app/app'], function(App) {
    module('Integration: AboutPage', {
        setup: function() {
            App.reset();
        },
        teardown: function() {
        }
    });
    
    test('Heading', function() {
        expect(1);
        
        visit('/about');

        andThen(function() {
            equal(find('h3').text().trim(), 'About');
        });
    });
});
