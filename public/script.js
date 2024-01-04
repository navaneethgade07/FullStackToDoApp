const todoList = document.getElementById('todoList');
const addTodoForm = document.getElementById('addTodoForm');

// Function to fetch and display todos
async function fetchTodos() {
    const response = await fetch(`/todos`);
    const todos = await response.json();

    todoList.innerHTML = '';
    todos.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.classList.add('todoItem');
        listItem.innerHTML = `
          <input type="checkbox" ${todo.completed ? 'checked' : ''} />
          <span>${todo.task}</span>
          <button onclick="deleteTodo('${todo._id}')">Delete</button>
        `;

        todoList.appendChild(listItem);
    });
}

// Function to add a new todo
async function addTodo(event) {
    event.preventDefault();

    const taskInput = document.getElementById('task');
    const task = taskInput.value;

    if (task.trim() === '') {
        alert('Task cannot be empty!');
        return;
    }

    await fetch(`/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            task: task,
            completed: false,
        }),
    });

    // Clear the input and fetch updated todos
    taskInput.value = '';
    fetchTodos();
}

// Function to delete a todo
async function deleteTodo(todoID) {
    await fetch(`/todos/${todoID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    // Fetch updated todos after deletion
    fetchTodos();
}

// Event listeners
addTodoForm.addEventListener('submit', addTodo);

// Initial fetch of todos
fetchTodos();
