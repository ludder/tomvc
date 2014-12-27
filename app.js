( function() {
    'use strict';

    var todolistController = new ToMvc.Controller( {
        init: function( view, model ) {
            var todolist = document.querySelector( '#todolist' );

            var actionButton = document.querySelector( '#add-todo button' );
            if ( actionButton ) {
                actionButton.addEventListener( 'click', function() {
                    view.addTodo( view );
                }, false );
            }

            var currentTodos = model.getCurrentTodos();
            view.writeCurrentTodos( currentTodos );

            model.listenTo( 'todo:added', function( data ) {
                var key = window.localStorage.length + 1;
                window.localStorage.setItem( key, data );
            } );
        }
    } );

    var todolistView = new ToMvc.View( {
        controller: todolistController,
        name: 'todolist',
        el: '#todolist',
        writeCurrentTodos: function( list ) {
            list.forEach( function( item ) {
                todolistView.writeTodo( item );
            } );
        },
        addTodo: function() {
            var text = window.prompt( 'enter event' );
            if ( !text ) {
                return;
            }

            this.writeTodo( text );

            var data = {

            };

            // var todoId = this.controller.getId(); // HIER GEBLEVEN

            // Model gets notified of added Todo
            this.broadcast( 'todo:added', text );

            // Immediately ask for another todo to enter
            this.addTodo( this );
        },
        writeTodo: function( text ) {
            var li = document.createElement( 'li' );
            // var input = document.createElement( 'input' );
            li.textContent = text;
            document.querySelector( this.el ).appendChild( li );
        }
    } );

    var todolistModel = new ToMvc.Model( {
        controller: todolistController,
        name: 'todolist',
        getCurrentTodos: function() {
            var list = [];
            for ( var key in window.localStorage ) {
                list.push( window.localStorage.getItem( key ) );
            }
            // TODO re-index keys because of deletions
            return list;
        }
    } );


    // TODO, create another app, to make sure that they do not interfere

    // GO!
    // console.info( 'todolistController', todolistController );
    todolistController.init( todolistView, todolistModel );

}() );
