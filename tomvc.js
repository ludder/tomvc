var ToMvc = {
    Controller : function() {
        var controller = this;

        this.views     = [];
        this.models    = [];
        this.events    = [];

        this.getViews = function() {
            return this.views;
        };
        this.getModels = function() {
            return this.models;
        };
        this.getEvents = function() {
            return this.events;
        };
        this.addView = function( name ) {
            this.views.push( name );
        };
        this.addModel = function( name ) {
            this.models.push( name );
        };
        this.addEvent = function( eventname, callback ) {
            controller.events.push( eventname, callback );
            console.info('events:', controller.events);
        }
    },
    View : function( name ) {
        var controller = new ToMvc.Controller;
        this.name = name ? name : 'view';
        this.getName = function() {
            return this.name;
        };
        this.listenTo = function( event, callback ) {
            controller.addEvent.call( this, event, function( data ) {
                console.info('view ' + this.name + ' called listener with data: ' + data );
            });
        }
    },
    Model : function() {
        return 1;
    }
}

function subView( name ) {
    var default_name = this.name;
    this.name        = name ? name : default_name;

    console.info('subview instance name = ', this.name);
    console.info('pap', this.getName());
}
subView.prototype = new ToMvc.View;

var tom = new subView();
tom.listenTo(1,2);
// console.info('naam =', tom );
console.info('naam =',tom.getName() );

