define(['app/app'], function(App) {
    module('Integration: NavMain', {
        setup: function() {
        },
        teardown: function() {
            App.reset();
        }
    });
    
    test('Navigation Links', function() {
        expect(3);

        visit('/');

        andThen(function() {
            equal(find('nav li:nth-child(1)').text().trim(), 'home');
            equal(find('nav li:nth-child(2)').text().trim(), 'games');
            equal(find('nav li:nth-child(3)').text().trim(), 'about');
        });
    });
});
