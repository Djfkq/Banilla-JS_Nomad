const createForm = document.querySelector("form#create-form");
const createNameInput = document.querySelector("#create-name input");
const createPassword1Input = document.querySelector("#create-password1 input");
const createPassword2Input = document.querySelector("#create-password2 input");
const createNewButton = document.querySelector("#create-new");

const loginForm = document.querySelector("form#login-form");
const loginNameInput = document.querySelector("#login-name input");
const loginPasswordInput = document.querySelector("#login-password input");
const greeting = document.querySelector("#greeting");

function onCreateSubmit(event) {
  event.preventDefault();
  const username = createNameInput.value;
  const password1 = createPassword1Input.value;
  const password2 = createPassword2Input.value;
  let usernames = [];
  let passwords = [];

  if (JSON.parse(localStorage.getItem("username")) !== null) {
    usernames = JSON.parse(localStorage.getItem("username"));
    passwords = JSON.parse(localStorage.getItem("password"));
  }
  if (password1 !== password2) {
    alert("Password1 should be same as password2");
  } else {
    if (usernames.includes(username)) {
      alert("The username is already exists. You should enter another name");
    } else {
      usernames.push(username);
      passwords.push(password1);
      localStorage.setItem("username", JSON.stringify(usernames));
      localStorage.setItem("password", JSON.stringify(passwords));
      createForm.classList.add("hidden");
      loginReady();
      alert("Account is created. Please log in");
    }
  }
}

function onCreateNew() {
  createForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
  createNewButton.classList.add("hidden");
  createForm.addEventListener("submit", onCreateSubmit);
  createNameInput.value = "";
  createPassword1Input.value = "";
  createPassword2Input.value = "";
}

function onLoginSubmit(event) {
  event.preventDefault();
  const usernameInput = loginNameInput.value;
  const passwordInput = loginPasswordInput.value;
  const usernames = JSON.parse(localStorage.getItem("username"));
  const passwords = JSON.parse(localStorage.getItem("password"));

  const userindex = usernames.indexOf(usernameInput);
  if (userindex === -1) {
    alert("The user is not exists. Please create an account");
  } else if (passwordInput !== passwords[userindex]) {
    alert("password is not correct");
  } else {
    createForm.classList.add("hidden");
    loginForm.classList.add("hidden");
    paintGreetings(usernameInput);
    saveLoginUser(usernameInput);
    showToDo(usernameInput);
    showLogOutButton();
  }
}

function saveLoginUser(username) {
  localStorage.setItem("loginUser", username);
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  const loginUser = localStorage.getItem("loginUser");
  let toDos = JSON.parse(localStorage.getItem(loginUser));

  toDos = toDos.filter((toDoObj) => toDoObj.id !== parseInt(li.id));
  localStorage.setItem(loginUser, JSON.stringify(toDos));

  li.remove();
}

function showToDo(username) {
  document.querySelector("#todo-form").classList.remove("hidden");
  document.querySelector("#todo-list").classList.remove("hidden");
  const userToDos = localStorage.getItem(username);
  const toDoList = document.querySelector("#todo-list");
  if (userToDos !== null) {
    JSON.parse(userToDos).forEach((toDoObject) => {
      const li = document.createElement("li");
      li.id = toDoObject.id;
      const span = document.createElement("span");
      span.innerText = toDoObject.text;
      const button = document.createElement("a");
      button.href = "#";
      button.role = "button";
      button.innerText = "X";
      button.addEventListener("click", deleteToDo);

      li.appendChild(span);
      li.appendChild(button);
      toDoList.appendChild(li);
    });
  }
}
function showLogOutButton() {
  const button = document.createElement("a");
  button.href = "#";
  button.role = "button";
  button.className = "logout";
  button.innerText = "log out";
  greeting.appendChild(button);
  button.addEventListener("click", () => {
    loginReady();
    greeting.classList.add("hidden");
    document.querySelector("#todo-form").classList.add("hidden");

    const toDoLists = document.querySelector("#todo-list");
    while (toDoLists.hasChildNodes()) {
      toDoLists.removeChild(toDoLists.firstChild);
    }
    loginNameInput.value = "";
    loginPasswordInput.value = "";
  });
}

function paintGreetings(username) {
  createNewButton.classList.add("hidden");
  greeting.classList.remove("hidden");
  greeting.innerText = `Hello!! ${username}`;
}

function loginReady() {
  createNewButton.classList.remove("hidden");
  createNewButton.addEventListener("click", onCreateNew);
  loginForm.classList.remove("hidden");
  loginForm.addEventListener("submit", onLoginSubmit);
}

const savedUsername = localStorage.getItem("username");

if (savedUsername === null) {
  createForm.classList.remove("hidden");
  createForm.addEventListener("submit", onCreateSubmit);
} else {
  loginReady();
}
