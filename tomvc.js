var ToMvc = {
    Controller : {
        views  : [],
        models : [],
        events : [],

        getViews: function() {
            return this.views;
        },
        // this.getModels = function() {
        //     return this.models;
        // };
        // this.getEvents = function() {
        //     return this.events;
        // };
        addView : function( name ) {
            this.views.push( name );
        },
        // this.addModel = function( name ) {
        //     this.models.push( name );
        //     return controller;
        // };
        // this.addEvent = function( eventname, callback ) {
        //     controller.events.push( eventname, callback );
        //     console.info('events:', controller.events);
        // }
    },
    View : function( name, element ) {
        // var controller = ToMvc.Controller; // Not OK, creates a new controller every time a view is created
        this.name      = name ? name : 'view';
        this.el        = document.querySelector( element );

        var controller = ToMvc.Controller.addView( this.name );

        this.getName = function() {
            return this.name;
        };
        this.listenTo = function( event, callback ) {
            // controller.addEvent.call( this, event, function( data ) {
            //     console.info('view ' + this.name + ' called listener with data: ' + data );
            // });
        };
    },
    Model : function() {
        return 1;
    },
}

// Example of how to create a derivate View
function subView( name ) {
    var default_name = this.name;
    this.name        = name ? name : default_name;
}
subView.prototype = new ToMvc.View;
// Example of how to create a derivate View

// var tom = new subView('aap');
// var view = new ToMvc.View();
// var tom = view.extend( 'testje');
var tom = new ToMvc.View('testje');
console.info('con',  ToMvc.Controller.getViews() );

tom.listenTo(1,2);
// console.info('naam =', tom );
console.info('naam =',tom.getName() );

