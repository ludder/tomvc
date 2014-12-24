var assert = chai.assert;

describe( 'Controller', function() {

    var model, view, controller;

    beforeEach( function() {
        controller = new ToMvc.Controller;
        view = null;
    } );

    afterEach( function() {
        controller = null;
        view = null;
        model = null;
    } );

    it( 'should register views', function() {
        assert.lengthOf( controller.views, 0, 'there should be 0 registered views' );
        view = new ToMvc.View( {
            controller: controller,
            el: '#testElement'
        } );
        assert.lengthOf( controller.views, 1, 'there should be 1 registered view' );
    } );

    it( 'should register models', function() {
        assert.lengthOf( controller.models, 0, 'there should be 0 registered models' );
        view = new ToMvc.Model( {
            controller: controller
        } );
        assert.lengthOf( controller.models, 1, 'there should be 1 registered model' );
    } );


} );
