(function() {
    var todolist      = document.querySelector('#todolist');
    var todolistView  = new ToMvc.View( 'todolist', '#todolist' );
    var todolistModel = new ToMvc.Model( 'todolist' );
    var nrTodos       = 0;

    function init() {
        document.querySelector('#add-todo button').addEventListener( 'click', addTodo, false);

        todolistModel.listenTo( 'todo:added', function( data ) {
            var key = nrTodos++;
            localStorage.setItem( nrTodos, data );
        });
    }

    function addTodo() {
        var text = window.prompt('enter event');
        if (!text) return;

        var li         = document.createElement('li');
        li.textContent = text;
        todolist.appendChild(li);

        // Added todo must be send to Model
        todolistView.broadcast( 'todo:added', text);

        // Immediately ask for another todo to enter
        addTodo();
    }


    // GO!
    init();

}());
