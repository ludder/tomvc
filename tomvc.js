( function( window ) {

    'use strict';

    var ToMvc = {};

    var Controller = function( options ) {
        this.defaults = {};
        this.views = [];
        this.models = [];
        this.events = [];

        extend.call( this, this.defaults, options );
    };

    var View = function( options ) {

        // Controller is necessary
        if ( options.controller ) {
            this.controller = options.controller;
        } else {
            throw "View constructor requires controller";
        }

        // DOM element is necessary
        if ( options.el ) {
            this.el = options.el;
        } else {
            throw "View constructor requires DOM element";
        }

        // Default options
        this.defaults = {
            name: this.getDefaultViewName(),
            listeners: []
        };

        // Extend defaults
        extend.call( this, this.defaults, options );

        this.controller.registerView()
        this.setName( options.name );
    };

    var Model = function( options ) {
        this.defaults = {
            name: 'modelTODO',
            listeners: []
        };

        extend.call( this, this.defaults, options );

    };


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
    Controller.prototype.registerView = function( name ) {
        this.views.push( name );
    };
    Controller.prototype.registerModel = function( name ) {
        this.models.push( name );
    };
    Controller.prototype.addEvent = function( eventname, callback, controller ) {
        controller.events.push( {
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
    View.prototype.getDefaultViewName = function() {
        return 'view' + this.controller.getViews.length + 1;
    };
    View.prototype.getName = function() {
        return this.name;
    };
    View.prototype.setName = function( name ) {
        this.name = name || 'view';
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
        controller.addEvent.call( this, event, callback, controller );
    };
    Model.prototype.broadcast = function( event, data ) {
        Controller.triggerEvent( event, data );
    };

    // Wrap up
    ToMvc.version = '0.1.0';
    ToMvc.Controller = Controller;
    ToMvc.View = View;
    ToMvc.Model = Model;

    // Make ToMvc globally available
    window.ToMvc = window.ToMvc || ToMvc;

    ///////////
    // Utils //
    ///////////

    // Based on http://youmightnotneedjquery.com/
    // Extend functions to caller
    // Extend all other options to given object
    var extend = function( out ) {
        out = out || {};

        for ( var i = 1; i < arguments.length; i++ ) {
            if ( !arguments[ i ] )
                continue;

            for ( var key in arguments[ i ] ) {
                // If it is a function, make it a method of the current instance
                if ( typeof arguments[ i ][ key ] === 'function' ) {
                    this[key] = arguments[ i ][ key ];
                } else if ( arguments[ i ].hasOwnProperty( key ) ) {
                    // else it's just a property
                    out[ key ] = arguments[ i ][ key ];
                }
            }
        }

        return out;
    };


}( window ) );

/*
    Example
 */
// function SubView( name, el ) {
//     ToMvc.View.call( this, name, el ); // call super constructor.
// }

// subclass extends superclass
// SubView.prototype = Object.create( ToMvc.View.prototype );
// SubView.prototype.constructor = SubView;

// var c = ToMvc.Controller.addView();
// console.info( 'c', c );


// var x = new SubView( 'aap' );
// console.info( 'views', x.getName() );
// var y = new SubView( 'neushoorn' );
// console.info( 'views', y.getName() );
// var z = new ToMvc.View( 'geit' );
// console.info( 'views', z.getName() );
