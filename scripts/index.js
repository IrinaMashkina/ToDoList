const clearBtn = document.querySelector(".container__clear-button");
const form = document.querySelector(".container__form");
const addTaskInput = document.querySelector(".container__input");
const taskList = document.querySelector(".container__list");
const task = document.querySelector("#task").content.cloneNode(true);
const allCkeckboxes = document.querySelectorAll(".checkbox__input_invisible");
const allFilterBtn = document.querySelector(
  ".container__filter-button_type_all"
);
const activeFilterBtn = document.querySelector(
  ".container__filter-button_type_active"
);
const completedFilterBtn = document.querySelector(
  ".container__filter-button_type_completed"
);

function clearCompleted() {
  const allCkeckboxes = document.querySelectorAll(".checkbox__input_invisible");

  for (let i = 0; i < allCkeckboxes.length; i++) {
    if (allCkeckboxes[i].checked) {
      allCkeckboxes[i].closest(".container__item").remove();
    }
  }
}

function checkId(id, label, input) {
  Array.from(document.querySelectorAll("input[id]")).forEach((i) => {
    if (i.id != id) {
      label.setAttribute("for", id);
      input.setAttribute("id", id);
    } else {
      checkId(generateId(), label, input);
    }
  });
}

function generateId() {
  const id = Math.floor(Math.random() * 1000000);
  return id;
}

function addNewTask(e) {
  e.preventDefault();
  const newTask = task.cloneNode(true);
  const text = newTask.querySelector(".checkbox__task");
  const label = newTask.querySelector(".checkbox");
  const input = newTask.querySelector(".checkbox__input_invisible");
  checkId(generateId(), label, input);
  text.textContent = addTaskInput.value;
  taskList.append(newTask);
  addTaskInput.value = "";
  setCount();
}

function toggleFilter(btn) {
  let activeBtn = document.querySelector(".container__filter-button_active");
  activeBtn.classList.remove("container__filter-button_active");
  btn.classList.add("container__filter-button_active");
}

function filterActivedTasks() {
  toggleFilter(activeFilterBtn);
  const allCkeckboxes = document.querySelectorAll(".checkbox__input_invisible");
  for (let i = 0; i < allCkeckboxes.length; i++) {
    allCkeckboxes[i].closest(".container__item").style.display = "flex";
    if (allCkeckboxes[i].checked) {
      allCkeckboxes[i].closest(".container__item").style.display = "none";
    }
  }
}

function filterCompletedTasks() {
  toggleFilter(completedFilterBtn);
  const allCkeckboxes = document.querySelectorAll(".checkbox__input_invisible");
  for (let i = 0; i < allCkeckboxes.length; i++) {
    allCkeckboxes[i].closest(".container__item").style.display = "flex";
    if (!allCkeckboxes[i].checked) {
      allCkeckboxes[i].closest(".container__item").style.display = "none";
    }
  }
}

function filterAllTasks() {
  toggleFilter(allFilterBtn);
  const allCkeckboxes = document.querySelectorAll(".checkbox__input_invisible");
  for (let i = 0; i < allCkeckboxes.length; i++) {
    allCkeckboxes[i].closest(".container__item").style.display = "flex";
  }
}

function getCount() {
  const allCkeckboxes = document.querySelectorAll(".checkbox__input_invisible");
  let counter = 0;
  for (let i = 0; i < allCkeckboxes.length; i++) {
    allCkeckboxes[i].checked ? counter : (counter += 1);
  }
  return counter;
}

function setCount() {
  const counterText = document.querySelector(".container__counter-text");
  counterText.textContent = `${getCount()} items left`;
}

setCount();

clearBtn.addEventListener("click", clearCompleted);
form.addEventListener("submit", addNewTask);
activeFilterBtn.addEventListener("click", filterActivedTasks);
completedFilterBtn.addEventListener("click", filterCompletedTasks);
allFilterBtn.addEventListener("click", filterAllTasks);
taskList.addEventListener("change", setCount);