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
    View: function( name, element ) {
        // var controller = ToMvc.Controller; // Not OK, creates a new controller every time a view is created
        this.name = name ? name : 'view';
        this.el = document.querySelector( element );

        ToMvc.Controller.addView( this.name );

        this.getName = function() {
            return this.name;
        };
        this.listenTo = function( event, callback ) {
            ToMvc.Controller.addEvent.call( this, event, callback );
        };
        this.broadcast = function( event, data ) {
            ToMvc.Controller.triggerEvent( event, data );
        };
    },
    Model: function( name ) {
        this.name = name ? name : 'model';

        ToMvc.Controller.addModel( this.name );

        this.getName = function() {
            return this.name;
        };
        this.setName = function( name ) {
            this.name = name;
            // TODO change name in controller model array
        };
        this.listenTo = function( event, callback ) {
            ToMvc.Controller.addEvent.call( this, event, callback );
        };
        this.broadcast = function( event, data ) {
            ToMvc.Controller.triggerEvent( event, data );
        };
    },
}

// Example of how to create a derivate View
function subView( name ) {
    var default_name = this.name;
    this.name = name ? name : default_name;
}
subView.prototype = new ToMvc.View;
// Example of how to create a derivate View


// var tom = new subView('aap');
// var view = new ToMvc.View();
// var tom = view.extend( 'testje');
var tom = new ToMvc.View( 'testje' );
// console.info('con',  ToMvc.Controller.getViews() );

tom.listenTo( 1, 2 );
// console.info('naam =', tom );
// console.info('naam =',tom.getName() );
