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

function clearCompleted() {
  const allCkeckboxes = document.querySelectorAll(".checkbox__input");

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
}

function filterActivedTasks() {}

function filterCompletedTasks() {}

function filterAllTasks() {}

clearBtn.addEventListener("click", clearCompleted);
form.addEventListener("submit", addNewTask);
activeFilterBtn.addEventListener("click", filterActivedTasks);
completedFilterBtn.addEventListener("click", filterCompletedTasks);
allFilterBtn.addEventListener("click", filterAllTasks);
