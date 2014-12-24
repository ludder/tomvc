var chai = chai || require( 'chai' ); // testem knows chai, but pure Mocha in Travis doesn't
var assert = chai.assert;

describe( 'Controller', function() {

    var model, view, controller;

    beforeEach( function() {
        controller = new ToMvc.Controller;
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

describe( 'View', function() {

    var view, controller;

    beforeEach( function() {
        controller = new ToMvc.Controller;
    } );

    afterEach( function() {
        controller = null;
        view = null;
    } );

    describe( 'view instantiation', function() {

        it( 'should throw an error when no controller is provided', function() {
            assert.throw( function() {
                view = new ToMvc.View( {} );
            }, /View constructor requires controller/ );
        } );

        it( 'should throw an error when no DOM element is provided', function() {
            assert.throw( function() {
                view = new ToMvc.View( {
                    controller: controller
                } );
            }, /View constructor requires DOM element/ );
        } );
    } );

    it( 'should generate a default view name if not provided', function() {
        view = new ToMvc.View( {
            controller: controller,
            el: '#testElement'
        } );
        assert.equal( 'view1', view.getDefaultViewName() );
    } );

    it( 'should use the default view name if not provided', function() {
        view = new ToMvc.View( {
            controller: controller,
            el: '#testElement'
        } );
        assert.equal( 'view1', view.getName() );
    } );

    it( 'should not use the default view name if a name is provided', function() {
        view = new ToMvc.View( {
            controller: controller,
            el: '#testElement',
            name: 'myView'
        } );
        assert.equal( 'myView', view.getName() );
    } );



} );
