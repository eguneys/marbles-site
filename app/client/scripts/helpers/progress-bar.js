'use strict';

define(['ember'], function(Ember) {
    Ember.Handlebars.helper('progress-bar', function(value, text) {
        var barTypes = [
            'progress-bar-danger',
            'progress-bar-warning',
            'progress-bar-info',
            'progress-bar-success'
        ];

        var percent = Math.min(value, 100);
        
        var barType = barTypes[Math.floor(percent / 25)];
                
        return new Ember.Handlebars
            .SafeString('<div class="progress-bar ' +
                        barType + '" role="progressbar" aria-valuenow="' +
                        percent +
                        '" aria-valuemin="0" aria-valuemax="100" style="width: ' +
                        percent +
                        '%">\n<span class="skill">' +
                        text +
                        ' <i> ' +
                        percent +
                        '%</i></span></div>');
    });
});
