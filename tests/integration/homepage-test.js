define(['app/app'], function(App) {
    module('Integration: Homepage', {
        setup: function() {
        },
        teardown: function() {
            App.reset();
        }
    });
    
    test('Heading', function() {
        expect(1);

        visit('/');
        
        andThen(function() {
            equal(find('section.page-title h2').text().trim(), 'A fun and easy way to play games');
            
        });
    });
});
