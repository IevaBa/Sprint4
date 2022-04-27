// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const deleteALL = document.querySelector(".delete-all");
const filter = document.getElementById("filter");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheckEdit);
filter.addEventListener("keyup", filterItems);

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
  // ADD TODO TO LOCAL STORAGE
  saveLocalTodos(todoInput.value);
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
      removeLocalTodos(todo);
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
//SAVE TO LOCAL STORAGE
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("Shopping List") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("Shopping List"));
  }
  todos.push(todo);
  localStorage.setItem("Shopping List", JSON.stringify(todos));
}
//GET ITEMS FROM LOCAL STORAGE
function getTodos() {
  let todos;
  if (localStorage.getItem("Shopping List") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("Shopping List"));
  }
  todos.forEach(function (todo) {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    const todoName = document.createElement("div");
    todoName.innerText = todo;
    todoName.classList.add("todo-name");
    todoItem.appendChild(todoName);
    //Create EDIT button
    const editButton = document.createElement("button");
    editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    editButton.classList.add("edit-btn");
    todoItem.appendChild(editButton);
    //Create CHECK button
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
  });
}
//REMOVE LOCAL TODOS
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("Shopping List") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("Shopping List"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("Shopping List", JSON.stringify(todos));
}
//DELETE ALL
deleteALL.addEventListener("click", function () {
  localStorage.clear();
});
//SEARCH AN ITEM
function filterItems(e) {
  let text = e.target.value.toLowerCase();
  let items = todoList.getElementsByClassName("todo-item");
  Array.from(items).forEach(function (item) {
    let itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(text) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}
