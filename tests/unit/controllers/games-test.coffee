define ['controllers/games_controller'], ->
    moduleFor 'controller:games', 'Games Controller', {
        needs: []
    }
    
    test 'exists', ->
        expect 1

        ctrl = @subject()
        
        ok ctrl
        
