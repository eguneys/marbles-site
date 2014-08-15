define ['models/poll_model'], ->
    moduleForModel 'poll', 'Poll Model', {
        needs: ['model:choice']
    }

    test 'exists', ->
        expect 1

        model = @subject()

        ok model
