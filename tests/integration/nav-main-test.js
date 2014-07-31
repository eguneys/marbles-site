define(['app/app'], function(App) {
    module('Integration: NavMain', {
        setup: function() {
            App.reset();
        },
        teardown: function() {
        }
    });
    
    test('Navigation Links', function() {
        expect(2);

        visit('/');

        andThen(function() {
            equal(find('nav li:nth-child(1)').text().trim(), 'Home');
            equal(find('nav li:nth-child(2)').text().trim(), 'About');
        });
    });
});
