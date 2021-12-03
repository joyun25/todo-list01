// Selectors
const todoInput = document.querySelector('.todo-input');
const todoAdd = document.querySelector('.todo-add');
const todoUl = document.querySelector('.todo-ul');
const filter = document.querySelector('.filter');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoAdd.addEventListener('click', addTodo);
todoUl.addEventListener('click', deleteCheck);
filter.addEventListener('click', filterSwitch);

// Functions
function addTodo(event) {

    // Prevent form from submitting 
    event.preventDefault();

    // Creat li
    const todoLi = document.createElement('li');
    todoLi.classList.add('todo-li');

    // Create li text
    const todoLiTxt = document.createElement('p');
    todoLiTxt.innerText = todoInput.value;
    todoLiTxt.classList.add('todo-item');
    todoLi.appendChild(todoLiTxt);

    // Add Todo to LocalStorage
    saveLocalTodos(todoInput.value);
    
    // Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add('completed-btn');
    todoLi.appendChild(completedButton);

    // Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add('trash-btn');
    todoLi.appendChild(trashButton);

    // Append to list (put lis in ul)
    todoUl.appendChild(todoLi);

    // Clear Todo input value
    todoInput.value = '';
}

function deleteCheck(e){
    const item = e.target;
    const todo = item.parentElement;

    // delete todo
    if(item.classList[0] === 'trash-btn'){

        // animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }

    // check mark
    if(item.classList[0] === 'completed-btn'){
        todo.classList.toggle('completed');
    }
}

function filterSwitch(e) {
    const todos = todoUl.childNodes;
    todos.forEach((todo) => {
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    // CHECK -- Hey Do I already have thing in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    // CHECK -- Hey Do I already have thing in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
    // Creat li
    const todoLi = document.createElement('li');
    todoLi.classList.add('todo-li');

    // Create li text
    const todoLiTxt = document.createElement('p');
    todoLiTxt.innerText = todo;
    todoLiTxt.classList.add('todo-item');
    todoLi.appendChild(todoLiTxt);
    
    // Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add('completed-btn');
    todoLi.appendChild(completedButton);

    // Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add('trash-btn');
    todoLi.appendChild(trashButton);

    // Append to list (put lis in ul)
    todoUl.appendChild(todoLi);
    });
}

function removeLocalTodos(todo){
    // CHECK -- Hey Do I already have thing in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    console.log(todos.indexOf(todo.children[0].innerText));
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos))
};