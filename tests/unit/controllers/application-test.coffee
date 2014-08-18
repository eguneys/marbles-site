define ['controllers/application_controller'], ->
    moduleFor 'controller:application', 'Application Controller', {
        needs: []
    }
    
    test 'exists', ->
        expect 1

        ctrl = @subject()
        
        ok ctrl
        
