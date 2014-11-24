var ToMvc = function() {
    this.controller = function() {
        // views
        // models
        // events
        // other functions
    }
}

// ToMvc.prototype.Controller = function() {
var Controller = function() {
    this.views = [];
    this.models = [];
    this.events = [];
};
// ToMvc.prototype.View = function( name, el ) {
var View = function( name, el ) {
    this.setName( name );
    this.el = el;
    console.info( 'con', controller );
    controller.addView( name );
};
// ToMvc.prototype.Model = function() {
var Model = function() {
    this.name = 'model';
};

var controller = new Controller(); // oef...


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

/*
    View
 */
View.prototype.init = function( name, element ) {
    this.setName( name );
    this.el = element;
    controller.addView( name ); // TODO
};
View.prototype.getName = function() {
    return this.name;
};
View.prototype.setName = function( name ) {
    this.name = name;
};
View.prototype.listenTo = function( event, callback ) {
    controller.addEvent.call( this, event, callback );
};
View.prototype.broadcast = function( event, data ) {
    controller.triggerEvent( event, data );
};


/*
    Model
 */
Model.prototype.init = function( name ) {
    this.setName( name );
    Controller.addModel( this.name );
};
Model.prototype.getName = function() {
    return this.name;
};
Model.prototype.setName = function( name ) {
    this.name = name;
    // TODO change name in controller model array
};
Model.prototype.listenTo = function( event, callback ) {
    Controller.addEvent.call( this, event, callback );
};
Model.prototype.broadcast = function( event, data ) {
    Controller.triggerEvent( event, data );
};


/*
    Example
 */
function SubView( name, el ) {
    View.call( this, name, el ); // call super constructor.
}

// subclass extends superclass
SubView.prototype = Object.create( View.prototype );
SubView.prototype.constructor = SubView;

var x = new SubView( 'aap' );
console.info( 'views', x );
