//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", removeCheckTodo);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

//Functions

function addTodo(event) {
  //prevent form from submitting
  event.preventDefault();
  //create Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create Li

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //add to local Storage

  saveLocalTodos(todoInput.value);

  //create check button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fa-regular fa-square-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //create trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //append to list
  todoList.appendChild(todoDiv);

  //clear todo input value
  todoInput.value = "";
}

function removeCheckTodo(event) {
  const item = event.target;
  //remove todo
  if (item.classList[0] === "trash-btn") {
    const deleteItem = item.parentElement;
    //animation
    deleteItem.classList.add("fall");
    removeTodosLocalStorage(deleteItem);
    deleteItem.addEventListener("transitionend", () => {
      deleteItem.remove();
    });
  }
  //check todo
  if (item.classList[0] === "complete-btn") {
    const checkItem = item.parentElement;
    checkItem.classList.toggle("completed");
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//save at local storage

function saveLocalTodos(todo) {
  //check if I have anything at the local storaged
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    //create Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //create check button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fa-regular fa-square-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
  });
}

function removeTodosLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
