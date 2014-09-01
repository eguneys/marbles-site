define ['components/vote-game'], ->
    moduleForComponent 'vote-game', 'VoteGame Component', {
        needs: []
    }

    test 'renders', ->
        expect 2

        component = @subject({poll: { choices: [] }})
        equal component.state, 'preRender'

        @append()
        equal component.state, 'inDOM'
