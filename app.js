let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = null;
let deleteIndex = null;

const todoList = document.getElementById("todoList");
const newTaskBtn = document.getElementById("newTaskBtn");
const taskModal = document.getElementById("taskModal");
const deleteModal = document.getElementById("deleteModal");

const taskTitle = document.getElementById("taskTitle");
const taskDesc = document.getElementById("taskDesc");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const cancelTaskBtn = document.getElementById("cancelTaskBtn");

const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");

// Render tasks
function renderTasks() {
  todoList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";

    taskDiv.innerHTML = `
      <div class="task-left">
        <input type="checkbox" ${task.done ? "checked" : ""}>
        <div class="task-text">
          <strong>${task.title}</strong><br>
          <small>${task.desc}</small>
        </div>
      </div>
      <button class="deleteBtn">🗑</button>
    `;

    // toggle færdig
    taskDiv.querySelector("input").addEventListener("change", () => {
      task.done = !task.done;
      saveTasks();
    });

    // åben rediger modal
    taskDiv.querySelector(".task-text").addEventListener("click", () => {
      editIndex = index;
      taskTitle.value = task.title;
      taskDesc.value = task.desc;
      taskModal.classList.remove("hidden");
    });

    // slet knap
    taskDiv.querySelector(".deleteBtn").addEventListener("click", () => {
      deleteIndex = index;
      deleteModal.classList.remove("hidden");
    });

    todoList.appendChild(taskDiv);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Ny opgave
newTaskBtn.addEventListener("click", () => {
  editIndex = null;
  taskTitle.value = "";
  taskDesc.value = "";
  taskModal.classList.remove("hidden");
});

// Gem opgave
saveTaskBtn.addEventListener("click", () => {
  const title = taskTitle.value.trim();
  const desc = taskDesc.value.trim();
  if (!title) return;

  if (editIndex !== null) {
    tasks[editIndex] = { title, desc, done: tasks[editIndex].done };
  } else {
    tasks.push({ title, desc, done: false });
  }

  saveTasks();
  taskModal.classList.add("hidden");
});

// Fortryd
cancelTaskBtn.addEventListener("click", () => {
  taskModal.classList.add("hidden");
});

// Slet bekræft
confirmDeleteBtn.addEventListener("click", () => {
  tasks.splice(deleteIndex, 1);
  saveTasks();
  deleteModal.classList.add("hidden");
});

// Slet nej
cancelDeleteBtn.addEventListener("click", () => {
  deleteModal.classList.add("hidden");
});

// Menu
menuBtn.addEventListener("click", () => {
  sideMenu.classList.toggle("show");
});

// Dark/Light mode
document.getElementById("lightModeBtn").addEventListener("click", () => {
  document.body.style.background = "#f5f5f5";
});
document.getElementById("darkModeBtn").addEventListener("click", () => {
  document.body.style.background = "#222";
  document.querySelectorAll(".task").forEach(t => {
    t.style.background = "#555";
  });
});

// Start
renderTasks();
