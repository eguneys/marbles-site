define ['controllers/game_controller'], ->
    moduleFor 'controller:games.game', 'Game Controller', {
        needs: []
    }
    
    test 'exists', ->
        expect 1

        ctrl = @subject()
        
        ok ctrl
        
