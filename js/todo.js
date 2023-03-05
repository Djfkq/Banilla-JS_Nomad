const newToDoForm = document.querySelector("#todo-form");
const newToDoInput = document.querySelector("#todo-form input");
const newToDoList = document.querySelector("#todo-list");

function deleteToDo(event) {
  const li = event.target.parentElement;
  const loginUser = localStorage.getItem("loginUser");
  let toDos = JSON.parse(localStorage.getItem(loginUser));

  toDos = toDos.filter((toDoObj) => toDoObj.id !== parseInt(li.id));
  localStorage.setItem(loginUser, JSON.stringify(toDos));

  li.remove();
}

function onToDoSubmit(event) {
  event.preventDefault();

  const newTodo = newToDoInput.value;
  const newToDoObject = {
    text: newTodo,
    id: Date.now(),
  };

  const li = document.createElement("li");
  li.id = newToDoObject.id;
  const span = document.createElement("span");
  span.innerText = newTodo;
  const button = document.createElement("a");
  button.href = "#"
  button.role = "button";
  button.innerText = "X";
  // const button = document.createElement("button");
  // button.innerText = "X";
  button.addEventListener("click", deleteToDo);

  li.appendChild(span);
  li.appendChild(button);
  newToDoList.appendChild(li);
  newToDoInput.value = "";

  const loginUser = localStorage.getItem("loginUser");
  const savedToDos = localStorage.getItem(loginUser);

  let toDos = [];
  if (savedToDos !== null) {
    toDos = JSON.parse(savedToDos);
  }
  toDos.push(newToDoObject);
  localStorage.setItem(loginUser, JSON.stringify(toDos));
}

newToDoForm.addEventListener("submit", onToDoSubmit);
