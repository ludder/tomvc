var chai = chai || require( 'chai' ); // testem knows chai, but pure Mocha in Travis doesn't
var assert = chai.assert;

describe( 'Model', function() {

    var model, controller;

    beforeEach( function() {
        controller = new ToMvc.Controller;
    } );

    afterEach( function() {
        controller = null;
        model = null;
    } );

    describe( 'model instantiation', function() {
        it( 'should throw an error when no controller is provided', function() {
            assert.throw( function() {
                model = new ToMvc.Model( {} );
            }, /Model constructor requires controller/ );
        } );
        it( 'should use the default model name if not provided', function() {
            model = new ToMvc.Model( {
                controller: controller
            } );
            assert.equal( 'model1', model.getName() );
        } );

        it( 'should not use the default model name if a name is provided', function() {
            model = new ToMvc.Model( {
                controller: controller,
                name: 'myModel'
            } );
            assert.equal( 'myModel', model.getName() );
        } );
    } );

    describe( 'subclassing', function() {

        it( 'should create an derived model class', function() {
            var SubModel = ToMvc.Model.extend();
            var mySubmodel = new SubModel( {
                controller: new ToMvc.Controller
            } );
            assert.instanceOf( mySubmodel, ToMvc.Model );
        } );

        it( 'should support own methods', function() {
            var SubModel = ToMvc.Model.extend();
            SubModel.prototype.myMethod = function() {
                return 1;
            };
            var mySubmodel = new SubModel( {
                controller: new ToMvc.Controller
            } );

            assert.equal( mySubmodel.myMethod(), 1 );
        } );
    } );

} );
