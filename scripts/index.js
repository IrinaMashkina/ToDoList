const clearBtn = document.querySelector(".container__clear-button");
const form = document.querySelector(".container__form");
const addTaskInput = document.querySelector(".container__input");
const taskList = document.querySelector(".container__list");
const task = document.querySelector("#task").content.cloneNode(true);
const allFilterBtn = document.querySelector(
  ".container__filter-button_type_all"
);
const activeFilterBtn = document.querySelector(
  ".container__filter-button_type_active"
);
const completedFilterBtn = document.querySelector(
  ".container__filter-button_type_completed"
);
const containerInvisibleText = document.querySelector(
  ".container__invisible-text"
);
let todos = [];

//функция добавления в localStorage
function addToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos(todos);
}

// получение элементов из localStorage
function getFromLocalStorage() {
  const reference = localStorage.getItem("todos");
  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

function renderTodos(todos) {
  addTaskInput.value = "";
  taskList.innerHTML = "";
  todos.forEach((item) => {
    const checked = item.checked ? "checked" : null;
    const newTask = task.cloneNode(true);
    const text = newTask.querySelector(".checkbox__task");
    const label = newTask.querySelector(".checkbox");
    const input = newTask.querySelector(".checkbox__input_invisible");
    text.textContent = item.text;
    label.setAttribute("for", item.id);
    input.setAttribute("id", item.id);
    input.checked = checked;
    taskList.append(newTask);
  });
  setCount();
  activedFilter();

}

function showTextForAddNewTask () {
  const successfulText = document.querySelector(".container__successful-text");
  showElement(successfulText);
  setTimeout(() => hideElement(successfulText), 800)
}

// удалить все выполненные задачи
function clearCompleted() {
  todos = todos.filter((item) => item.checked == false);
  addToLocalStorage(todos);
  activedFilter();
}



function activedFilter() {
  const nameClass = "container__filter-button_active";
  if (activeFilterBtn.classList.contains(nameClass)) {
    filterActivedTasks();
  } else if (allFilterBtn.classList.contains(nameClass)) {
    filterAllTasks();
  } else {
    filterCompletedTasks();
  }
}

// добавляем новую задачу
function addNewTask(e) {
  e.preventDefault();
  addTodo(addTaskInput.value);
  hideElement(containerInvisibleText);
  activedFilter();
  showTextForAddNewTask();
  addTaskInput.value = "";

}

function addTodo(item) {
  const todo = {
    id: Date.now(),
    text: item,
    checked: false,
  };
  todos.push(todo);
  addToLocalStorage(todos);
  addTaskInput.value = "";
  // обновляем счетчик активных задач
  setCount();
}

// переключние чекбоксов
function toggleCheckbox(e) {
  if (e.target.type === "checkbox") {
    toggleChecked(e.target);
  }
}

function toggleChecked(target) {
  todos.forEach((item) => {
    if (target.id == item.id) {
      item.checked = !item.checked;
      item.checked ? (target.checked = true) : (target.checked = false);
    }
  });
  addToLocalStorage(todos);
  activedFilter();
}

// переключение кнопки (только одна из кнопок может быть активна)
function toggleFilter(btn) {
  const activeBtn = document.querySelector(".container__filter-button_active");
  activeBtn.classList.remove("container__filter-button_active");
  btn.classList.add("container__filter-button_active");
}

// Показать все задачи
function filterAllTasks() {
  const allCkeckboxes = document.querySelectorAll(".checkbox__input_invisible");
  toggleFilter(allFilterBtn);
  for (let i = 0; i < allCkeckboxes.length; i++) {
    const item = allCkeckboxes[i].closest(".container__item");
    showElement(item);
  }
  toggleVisibleAndInvisibleText(allCkeckboxes.length, "Добавьте новые задачи");
}

// показать только активные (невыполненные) задачи
function filterActivedTasks() {
  const allCkeckboxes = document.querySelectorAll(".checkbox__input_invisible");
  toggleFilter(activeFilterBtn);

  for (let i = 0; i < allCkeckboxes.length; i++) {
    const item = allCkeckboxes[i].closest(".container__item");
    showElement(item);
    if (allCkeckboxes[i].checked) {
      hideElement(item);
    }
  }
  toggleVisibleAndInvisibleText(getActiveCount(), "Нет активных задач");
}

// показать только выполненные задачи
function filterCompletedTasks() {
  const allCkeckboxes = document.querySelectorAll(".checkbox__input_invisible");
  toggleFilter(completedFilterBtn);
  for (let i = 0; i < allCkeckboxes.length; i++) {
    const item = allCkeckboxes[i].closest(".container__item");
    showElement(item);
    if (!allCkeckboxes[i].checked) {
      hideElement(item);
    }
  }
  toggleVisibleAndInvisibleText(getCompletedCount(), "Нет выполненных задач");
}

// переключатель видимый/невидимый текст по счётчику задач
function toggleVisibleAndInvisibleText(counter, text) {
  if (counter === 0) {
    visibleText(text);
  } else {
    hideElement(containerInvisibleText);
  }
}

// показать скрытый текст
function visibleText(text) {
  showElement(containerInvisibleText);
  containerInvisibleText.textContent = text;
}

// скрыть элемент
function hideElement(element) {
  element.style.display = "none";
}

// показать элемент
function showElement(element) {
  element.style.display = "flex";
}

// счётчик активных (невыполненных) задач
function getActiveCount() {
  const allCkeckboxes = document.querySelectorAll(".checkbox__input_invisible");
  let counter = 0;
  for (let i = 0; i < allCkeckboxes.length; i++) {
    allCkeckboxes[i].checked ? counter : (counter += 1);
  }
  return counter;
}

// счётчик выполненных задач
function getCompletedCount() {
  const checkedCheckboxes = document.querySelectorAll(
    ".checkbox__input_invisible:checked"
  );
  let counter = 0;
  for (let i = 0; i < checkedCheckboxes.length; i++) {
    !checkedCheckboxes[i].checked ? counter : (counter += 1);
  }
  return counter;
}

// Добавить количество активных задач
function setCount() {
  const counterText = document.querySelector(".container__counter-text");
  counterText.textContent = `${getActiveCount()} items left`;
}

setCount();
getFromLocalStorage();

clearBtn.addEventListener("click", clearCompleted);
form.addEventListener("submit", addNewTask);
activeFilterBtn.addEventListener("click", filterActivedTasks);
completedFilterBtn.addEventListener("click", filterCompletedTasks);
allFilterBtn.addEventListener("click", filterAllTasks);
taskList.addEventListener("change", setCount);
taskList.addEventListener("click", toggleCheckbox);
