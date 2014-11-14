(function() {
    var todoapp = new ToMvc();
    var todolist = document.querySelector('#todolist');

    var todolistView = todoapp.registerView( 'todolist', todolist );

    document.querySelector('#add-todo button').addEventListener( 'click', addTodo, false);

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

}());
