var chai = chai || require( 'chai' ); // testem knows chai, but pure Mocha in Travis doesn't
var assert = chai.assert;

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

    describe( 'subclassing', function() {

        it( 'should create an derived view class', function() {
            var SubView = ToMvc.View.extend();
            var mySubview = new SubView( {
                controller: new ToMvc.Controller,
                el: 'body'
            } );
            assert.instanceOf( mySubview, ToMvc.View );
        } );
    } );

} );
