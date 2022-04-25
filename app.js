// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// Event Listeners
todoButton.addEventListener("click", addTodo);

// Functions
function addTodo(event) {
  event.preventDefault(); //prevent form from submiting
  //Create todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //Create EDIT button
  const editButton = document.createElement("button");
  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  editButton.classList.add("edit-btn");
  todoDiv.appendChild(editButton);
  //Create COMPLETED button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //Create DELETE button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);
  // APPEND TO LIST AND NOT ALLOW EMPTY VALUE
  if (todoInput.value) {
    todoList.appendChild(todoDiv);
  } else {
    alert("You must add the item");
  }
  todoInput.value = "";
}
