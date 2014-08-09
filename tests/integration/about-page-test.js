define(['app/app'], function(App) {
    module('Integration: AboutPage', {
        setup: function() {
        },
        teardown: function() {
            App.reset();
        }
    });
    
    test('Heading', function() {
        expect(1);
        
        visit('/about');

        andThen(function() {
            equal(find('section.page-title h2').text().trim(), 'About Us');
        });
    });
});
