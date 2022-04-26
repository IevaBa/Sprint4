// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheckEdit);

// Functions
function addTodo(event) {
  event.preventDefault(); //prevent form from submiting
  if (todoInput.value === "") {
    alert("You must add the item");
    return;
  }
  //Create todo LI
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");
  //Create todo DIV
  const todoName = document.createElement("div");
  todoName.innerText = todoInput.value;
  todoName.classList.add("todo-name");
  todoItem.appendChild(todoName);
  //Create EDIT button
  const editButton = document.createElement("button");
  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  editButton.classList.add("edit-btn");
  todoItem.appendChild(editButton);
  //Create COMPLETED button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoItem.appendChild(completedButton);
  //Create DELETE button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
  deleteButton.classList.add("delete-btn");
  todoItem.appendChild(deleteButton);
  // APPEND TO LIST
  todoList.appendChild(todoItem);
  //Clear TODO INPUT VALUE
  todoInput.value = "";
}
function deleteCheckEdit(event) {
  const item = event.target;
  //DELETE ITEM
  if (item.classList[0] === "delete-btn") {
    if (confirm("Are You Sure?")) {
      const todo = item.parentElement;
      todo.remove();
    }
  }
  //COMPLETED ITEM
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
  //EDIT ITEM
  if (item.classList[0] === "edit-btn") {
    const todo = item.parentElement;
    const editItem = prompt("Edit selected item", todo.textContent);
    const todoName = todo.querySelector(".todo-name");
    todoName.textContent = editItem;
  }
}
