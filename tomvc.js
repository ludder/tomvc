( function( window ) {

    'use strict';

    var ToMvc = {};

    /*
        Controller constructor
     */
    var Controller = function( options ) {
        this.defaults = {};
        this.views = [];
        this.models = [];
        this.events = [];

        merge.call( this, this.defaults, options );
    };

    /*
        View constructor
     */
    var View = function( options ) {

        // Controller is necessary
        if ( options && options.controller ) {
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
            listeners: []
        };

        // Extend defaults
        merge.call( this, this.defaults, options );

        this.setName( options.name );
        this.controller.registerView( this.getName() );

    };

    /*
        Model constructor
     */
    var Model = function( options ) {
        this.defaults = {
            listeners: []
        };

        // Controller is necessary
        if ( options.controller ) {
            this.controller = options.controller;
        } else {
            throw "Model constructor requires controller";
        }

        merge.call( this, this.defaults, options );

        this.setName( options.name );
        this.controller.registerModel( this.getName() );
    };

    /*
        Make OOP possible
     */
    function extend() {
        var parent = this; // ToMvc.Controller || ToMvc.View || ToMvc.Model

        var extended = function( options ) {
            parent.call( this, options ); // call super constructor.
        }
        // Do the OOP trick:
        extended.prototype = Object.create( parent.prototype );
        extended.prototype.constructor = extended;

        return extended;
    }

    // Add extend option to all basic ToMvc methods
    Controller.extend = View.extend = Model.extend = extend;


    /*
        Controller
    */
    Controller.prototype.getViews = function() {
        return this.views.slice();
    };
    Controller.prototype.getModels = function() {
        return this.models.slice();
    };
    Controller.prototype.getEvents = function() {
        return this.events.slice();
    };
    Controller.prototype.registerView = function( name ) {
        this.views.push( name );
    };
    Controller.prototype.registerModel = function( name ) {
        this.models.push( name );
    };
    Controller.prototype.addEvent = function( eventname, callback, controller ) {
        this.controller.events.push( {
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
    View.prototype.getDefaultName = function() {
        return 'view' + ( this.controller.getViews().length + 1 );
    };
    View.prototype.getName = function() {
        return this.name;
    };
    View.prototype.setName = function( name ) {
        this.name = name || this.getDefaultName();
    };
    View.prototype.listenTo = function( event, callback ) {
        this.controller.addEvent.call( this, event, callback );
    };
    View.prototype.broadcast = function( event, data ) {
        this.controller.triggerEvent( event, data );
    };

    /*
        Model
     */
    Model.prototype.init = function( name ) {
        this.setName( name );
        Controller.addModel( this.name );
    };
    Model.prototype.getDefaultName = function() {
        return 'model' + ( this.controller.getModels().length + 1 );
    };
    Model.prototype.getName = function() {
        return this.name;
    };
    Model.prototype.setName = function( name ) {
        this.name = name || this.getDefaultName();
    };
    Model.prototype.listenTo = function( event, callback ) {
        this.controller.addEvent.call( this, event, callback, this.lcontroller );
    };
    Model.prototype.broadcast = function( event, data ) {
        this.controller.triggerEvent( event, data );
    };

    // Wrap up
    ToMvc.version = '0.2.0';
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
    var merge = function( out ) {
        out = out || {};

        for ( var i = 1; i < arguments.length; i++ ) {
            if ( !arguments[ i ] )
                continue;

            for ( var key in arguments[ i ] ) {
                // If it is a function, make it a method of the current instance
                if ( typeof arguments[ i ][ key ] === 'function' ) {
                    this[ key ] = arguments[ i ][ key ];
                } else if ( arguments[ i ].hasOwnProperty( key ) ) {
                    // else it's just a property
                    out[ key ] = arguments[ i ][ key ];
                }
            }
        }

        return out;
    };


}( typeof window == "undefined" ? global : window ) ); // window not available in node
