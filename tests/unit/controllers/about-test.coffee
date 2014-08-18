define ['controllers/about_controller'], ->
    moduleFor 'controller:about', 'About Controller', {
        needs: []
    }
    
    test 'exists', ->
        expect 1

        ctrl = @subject()
        
        ok ctrl
        
