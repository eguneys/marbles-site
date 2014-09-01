define ['components/feed-back'], ->
    moduleForComponent 'feed-back', 'Feedback Component', {
        needs: []
    }

    test 'renders', ->
        expect 2

        component = @subject()
        equal component.state, 'preRender'

        @append()
        equal component.state, 'inDOM'
