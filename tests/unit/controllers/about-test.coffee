define ['app/app', 'ember-flash-message', 'controllers/about_controller'], (App) ->
    if (!App.FlashMessageController)
        App.FlashMessageController = Ember.FlashMessageController

    moduleFor 'controller:about', 'About Controller', {
        needs: ['controller:flashMessage']
    }
    
    test 'exists', ->
        expect 1

        ctrl = @subject()
        
        ok ctrl
        
