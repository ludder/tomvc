( function() {

    var ToMvc = function() {

        this.version = '0.1.0';


        this.Controller = function() {
            return controller;
        };

        this.View = function( name, el ) {
            this.setName( name );
            this.el = el;
            // console.info( 'con', controller );
            controller.addView( name );
        };

        this.Model = function( name ) {
            this.name = 'model';
        };
    };


    // ToMvc.prototype.Controller = function() {
    var Controller = function() {
        this.views = [];
        this.models = [];
        this.events = [];
    };
    var View = function( name, el ) {
        // ToMvc.prototype.View = function( name, el ) {
        this.setName( name );
        this.el = el;
        controller.addView( name );
    };
    // var Model = function() {
    // ToMvc.prototype.Model = function() {
    //     this.name = 'model';
    // };


    /*
        Controller
    */
    Controller.prototype.getViews = function() {
        return this.views;
    };
    Controller.prototype.getModels = function() {
        return this.models;
    };
    Controller.prototype.getEvents = function() {
        return this.events;
    };
    Controller.prototype.addView = function( name ) {
        this.views.push( name );
    };
    Controller.prototype.addModel = function( name ) {
        this.models.push( name );
    };
    Controller.prototype.addEvent = function( eventname, callback ) {
        this.events.push( {
            'eventname': eventname,
            'callback': callback
        } );
        // console.info('events:', ToMvc.Controller.events);
    };
    Controller.prototype.triggerEvent = function( eventname, data ) {
        this.events.forEach( function( event ) {
            if ( event.eventname === eventname ) {
                event.callback( data );
            }
        } );
    };

    // We don't want the Controller to be accessible from outside
    // Communications flow via View and Model
    // These however, do not knwo of each others existince
    // And communicate via events
    var tomvc = new ToMvc;
    var controller = new Controller;



    /*
        View
     */
    // Obsolete function?
    tomvc.View.init = function( name, element ) {
        console.info( 'huh', this );
        this.setName( name );
        this.el = element;
        controller.addView( name ); // TODO
    };
    tomvc.View.prototype.getName = function() {
        return this.name;
    };
    tomvc.View.prototype.setName = function( name ) {
        this.name = name;
    };
    tomvc.View.prototype.listenTo = function( event, callback ) {
        controller.addEvent.call( this, event, callback );
    };
    tomvc.View.prototype.broadcast = function( event, data ) {
        controller.triggerEvent( event, data );
    };


    /*
        Model
     */
    tomvc.Model.prototype.init = function( name ) {
        this.setName( name );
        Controller.addModel( this.name );
    };
    tomvc.Model.prototype.getName = function() {
        return this.name;
    };
    tomvc.Model.prototype.setName = function( name ) {
        this.name = name;
        // TODO change name in controller model array
    };
    tomvc.Model.prototype.listenTo = function( event, callback ) {
        controller.addEvent.call( this, event, callback );
    };
    tomvc.Model.prototype.broadcast = function( event, data ) {
        Controller.triggerEvent( event, data );
    };

    // Make ToMvc globally available
    window.ToMvc = tomvc;

}() );

/*
    Example
 */
function SubView( name, el ) {
    ToMvc.View.call( this, name, el ); // call super constructor.
}

// subclass extends superclass
SubView.prototype = Object.create( ToMvc.View.prototype );
SubView.prototype.constructor = SubView;

// var c = ToMvc.Controller.addView();
// console.info( 'c', c );


var x = new SubView( 'aap' );
console.info( 'views', x.getName() );
var y = new SubView( 'neushoorn' );
console.info( 'views', y.getName() );
var z = new ToMvc.View( 'geit' );
console.info( 'views', z.getName() );
