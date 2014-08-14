define ['models/game_model'], ->
    moduleForModel 'game', 'Game Model', {
        needs: []
    }

    test 'exists', ->
        expect 1

        model = @subject()

        ok model
