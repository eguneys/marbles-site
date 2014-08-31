define ['components/feedback'], ->
    moduleForComponent 'feedback', 'Feedback Component', {
        needs: []
    }

    test 'renders', ->
        expect 2

        component = @subject()
        equal component.state, 'preRender'

        @append()
        equal component.state, 'inDOM'
