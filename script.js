const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const taskCount = document.getElementById('task-count');
const clearCompletedBtn = document.getElementById('clear-completed');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function updateCount() {
  const activeCount = todos.filter(t => !t.completed).length;
  taskCount.textContent = `${activeCount} task${activeCount === 1 ? '' : 's'} left`;
}

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'todo-content';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todo.text;

    contentDiv.appendChild(checkbox);
    contentDiv.appendChild(span);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.title = 'Delete task';
    deleteBtn.addEventListener('click', () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });

  updateCount();
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    saveTodos();
    renderTodos();
    todoInput.value = '';
  }
});

clearCompletedBtn.addEventListener('click', () => {
  todos = todos.filter(t => !t.completed);
  saveTodos();
  renderTodos();
});

renderTodos();
