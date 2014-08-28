define ['models/newsletter_model'], ->
    moduleForModel 'newsletter', 'Newsletter Model', {
        needs: []
    }

    test 'exists', ->
        expect 1

        model = @subject()

        ok model
