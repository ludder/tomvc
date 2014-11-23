var ToMvc = {
    Controller: {
        views: [],
        models: [],
        events: [],

        getViews: function() {
            return ToMvc.Controller.views;
        },
        getModels: function() {
            return ToMvc.Controller.models;
        },
        getEvents: function() {
            return ToMvc.Controller.events;
        },
        addView: function( name ) {
            ToMvc.Controller.views.push( name );
        },
        addModel: function( name ) {
            ToMvc.Controller.models.push( name );
        },
        addEvent: function( eventname, callback ) {
            ToMvc.Controller.events.push( {
                'eventname': eventname,
                'callback': callback
            } );
            // console.info('events:', ToMvc.Controller.events);
        },
        triggerEvent: function( eventname, data ) {
            ToMvc.Controller.events.forEach( function( event ) {
                if ( event.eventname === eventname ) {
                    event.callback( data );
                }
            } );
        }
    },
    View: {
        // var controller = ToMvc.Controller; // Not OK, creates a new controller every time a view is created
        name: 'view',
        el: null,
        init: function( name, element ) {
            this.setName( name );
            this.el = element;
            ToMvc.Controller.addView( name );
        },
        getName: function() {
            return this.name;
        },
        setName: function( name ) {
            this.name = name;
        },
        listenTo: function( event, callback ) {
            ToMvc.Controller.addEvent.call( this, event, callback );
        },
        broadcast: function( event, data ) {
            ToMvc.Controller.triggerEvent( event, data );
        },
    },
    Model: {
        name: 'model',

        init: function( name ) {
            this.setName( name );
            ToMvc.Controller.addModel( this.name );
        },
        getName: function() {
            return this.name;
        },
        setName: function( name ) {
            this.name = name;
            // TODO change name in controller model array
        },
        listenTo: function( event, callback ) {
            ToMvc.Controller.addEvent.call( this, event, callback );
        },
        broadcast: function( event, data ) {
            ToMvc.Controller.triggerEvent( event, data );
        },
    },
}

// Example of how to create a derivate View
var tom = Object.create( ToMvc.View );
tom.init( 'testje', 'body' );
// Example of how to create a derivate View

tom.listenTo( 1, 2 );
