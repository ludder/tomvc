// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
// Shape - superclass
function Shape() {
    this.x = 0;
    this.y = 0;

    console.info('Shape called', this);

    // private function
    function test( a ) {
        console.info( 'in Shape = a', a );
    }
}

// superclass method
Shape.prototype.move = function( x, y ) {
    this.x += x;
    this.y += y;
    console.info( 'Shape moved.' );
};

// Rectangle - subclass
function Rectangle( a ) {
    console.info( 'nu zijn we hier', a );
    Shape.call( this ); // call super constructor.
}

// subclass extends superclass
Rectangle.prototype = Object.create( Shape.prototype );
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle( 'aapjes' );

rect instanceof Rectangle; // true
rect instanceof Shape; // true

rect.move( 1, 1 ); // Outputs, 'Shape moved.'

Rectangle.prototype.doit = function( t ) {
    console.info( 't =', t );
}

rect.doit( 'nu gaan' );
// rect.test( 'nu gaan' );

// //////////////////////
// //////////////////////
// //////////////////////

( function() {
    var todolistController = Object.create( ToMvc.Controller );
    var todolistView = Object.create( ToMvc.View );
    var todolistModel = Object.create( ToMvc.Model );
    // TODO, create another app, to make sure that they do not interfere

    todolistController.init = function() {
        var todolist = document.querySelector( '#todolist' );
        todolistView.init( 'todolist', '#todolist' );
        todolistModel.init( 'todolist' );

        document.querySelector( '#add-todo button' ).addEventListener( 'click', todolistView.addTodo, false );

        var currentTodos = todolistModel.getCurrentTodos();
        todolistView.writeCurrentTodos( currentTodos );

        todolistModel.listenTo( 'todo:added', function( data ) {
            var key = window.localStorage.length + 1;
            window.localStorage.setItem( key, data );
        } );
    }

    // model method
    todolistModel.getCurrentTodos = function() {
        // function getCurrentTodos() {
        var list = [];
        for ( var key in localStorage ) {
            list.push( window.localStorage.getItem( key ) );
        }
        // TODO re-index keys because of deletions
        return list;
    };

    todolistView.writeCurrentTodos = function( list ) {
        list.forEach( function( item ) {
            todolistView.writeTodo( item );
        } );
    };

    // view method
    todolistView.addTodo = function() {
        var text = window.prompt( 'enter event' );
        if ( !text ) return;

        todolistView.writeTodo( text );

        // Added todo must be send to Model
        todolistView.broadcast( 'todo:added', text );

        // Immediately ask for another todo to enter
        todolistView.addTodo();
    };

    // view method
    todolistView.writeTodo = function( text ) {
        var li = document.createElement( 'li' );
        li.textContent = text;
        todolist.appendChild( li );
    };


    // GO!
    todolistController.init();

}() );
