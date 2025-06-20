const form = document.getElementById('todoForm');
const titleInput = document.getElementById('title');
const todoList = document.getElementById('todoList');

const loadTodos = async () => {
  const res = await fetch('/todos');
  const todos = await res.json();

  todoList.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${todo.completed ? '<s>' : ''}${todo.title}${todo.completed ? '</s>' : ''}
      <button onclick="deleteTodo(${todo.id})">Delete</button>
    `;
    todoList.appendChild(li);
  });
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  if (!title) return;

  await fetch('/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });

  titleInput.value = '';
  loadTodos();
});

const deleteTodo = async (id) => {
  await fetch(`/todos/${id}`, { method: 'DELETE' });
  loadTodos();
};

loadTodos();
