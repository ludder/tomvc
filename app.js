( function() {
    var todolist = document.querySelector( '#todolist' );
    var todolistView = new ToMvc.View( 'todolist', '#todolist' );
    var todolistModel = new ToMvc.Model( 'todolist' );


    // var todolistModel = function() {
    //         this.name = 'todolist';
    //     }
        // todolistModel.prototype = new ToMvc.View;


    function init() {
        document.querySelector( '#add-todo button' ).addEventListener( 'click', addTodo, false );

        // console.info( 'model', todolistModel );
        // var currentTodos = todolistModel.getCurrentTodos();
        var currentTodos = getCurrentTodos();
        writeCurrentTodos( currentTodos );

        todolistModel.listenTo( 'todo:added', function( data ) {
            var key = window.localStorage.length + 1;
            window.localStorage.setItem( key, data );
        } );
    }

    // model method
    // todolistModel.prototype.getCurrentTodos = function() {
    function getCurrentTodos() {
        var list = [];
        for ( var key in localStorage ) {
            list.push( window.localStorage.getItem( key ) );
        }
        // TODO re-index keys because of deletions
        return list;
    }

    function writeCurrentTodos( list ) {
        list.forEach( function( item ) {
            writeTodo( item );
        } );
    }

    // view method
    function addTodo() {
        var text = window.prompt( 'enter event' );
        if ( !text ) return;

        writeTodo( text );

        // Added todo must be send to Model
        todolistView.broadcast( 'todo:added', text );

        // Immediately ask for another todo to enter
        addTodo();
    }

    // view method
    function writeTodo( text ) {
        var li = document.createElement( 'li' );
        li.textContent = text;
        todolist.appendChild( li );
    }


    // GO!
    init();

}() );
