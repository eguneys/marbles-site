define(['components/popover-link'], function() {
    moduleForComponent('popover-link', 'PopoverLink Component', {
       needs: [] 
    });
    
    test('renders', function() {
        expect(2);

        var component = this.subject();
        equal(component.state, 'preRender');

        this.append();
        equal(component.state, 'inDOM');
    });
});
