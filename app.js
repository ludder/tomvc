( function() {
    var todolistController = Object.create( ToMvc.Controller );
    var todolistView, todolistModel;

    // var todolistView = Object.create( ToMvc.View );
    function TodolistView( name, el ) {
        ToMvc.View.call( this, name, el ); // call super constructor.
    }
    TodolistView.prototype = Object.create( ToMvc.View.prototype );
    TodolistView.prototype.constructor = TodolistView;

    // var todolistModel = Object.create( ToMvc.Model );
    function TodolistModel( name ) {
        ToMvc.Model.call( this, name ); // call super constructor.
    }
    TodolistModel.prototype = Object.create( ToMvc.Model.prototype );
    TodolistModel.prototype.constructor = TodolistModel;

    // TODO, create another app, to make sure that they do not interfere

    todolistController.init = function() {
        var todolist = document.querySelector( '#todolist' );
        todolistView = new TodolistView( 'todolist', '#todolist' );
        todolistModel = new TodolistModel( 'todolist' );

        // document.querySelector( '#add-todo button' ).addEventListener( 'click', todolistView.addTodo, false );
        document.querySelector( '#add-todo button' ).addEventListener( 'click', function() {
            todolistView.addTodo( todolistView );
        }, false );

        var currentTodos = todolistModel.getCurrentTodos();
        todolistView.writeCurrentTodos( currentTodos );

        todolistModel.listenTo( 'todo:added', function( data ) {
            var key = window.localStorage.length + 1;
            window.localStorage.setItem( key, data );
        } );
    }

    // model method
    TodolistModel.prototype.getCurrentTodos = function() {
        // function getCurrentTodos() {
        var list = [];
        for ( var key in localStorage ) {
            list.push( window.localStorage.getItem( key ) );
        }
        // TODO re-index keys because of deletions
        return list;
    };

    TodolistView.prototype.writeCurrentTodos = function( list ) {
        list.forEach( function( item ) {
            todolistView.writeTodo( item );
        } );
    };

    // It's a pity we have to rely on the view instance...
    // TODO: solve in a better way
    TodolistView.prototype.addTodo = function() {
        var text = window.prompt( 'enter event' );
        if ( !text ) return;

        todolistView.writeTodo( text );

        // Added todo must be send to Model
        todolistView.broadcast( 'todo:added', text );

        // Immediately ask for another todo to enter
        todolistView.addTodo( todolistView );
    };

    // view method
    TodolistView.prototype.writeTodo = function( text ) {
        var li = document.createElement( 'li' );
        li.textContent = text;
        todolist.appendChild( li );
    };


    // GO!
    todolistController.init();

}() );
