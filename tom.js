( function() {

    var tom = function() {
        var name = 'aap';

        function getName() {
            return name;
        }

        function setName( newname ) {
            name = newname;
        }

        var View = function() {
            this.controller = Controller;
            this.name = 'base view';
            this.addView = function( name ) {
                console.info( 'view added', name );
            };
            this.create = function( name ) {
                console.info( 'create view ', name );
            };
        };
        return {
            getName: getName,
            setName: setName,
            // Controller: Controller,
            View: View
        }
    }

    var Controller = {
        events: [],
        addEvent: function( event ) {
            this.events.push( event );
            console.info( 'controller events:', this.events );
        }
    }

    Controller.addEvent( 'aap1' );

    window.Tom = window.Tom || new tom;

}() );


Tom.setName( 'set my name' ); // works

var superView = new Tom.View();
console.info( 'superView', superView );
superView.create( 'superview create' );


var SubView = function() {
    Tom.View.call( this );
    this.doiets = function() {
        console.info( 'alleen in de subview' );
    }
};

// SubView.prototype = Object.create( Tom.View.prototype );
SubView.prototype = Object.create( Tom.View.prototype );

var mySubView = new SubView();
mySubView.doiets();
console.info( mySubView.controller );

var mySubView2 = new Tom.View();
console.info( mySubView2.controller );

