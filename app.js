// MODEL
const Model = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  editIndex: null,
  deleteIndex: null,

  save() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  },

  addTask(title, desc) {
    this.tasks.push({ title, desc, done: false });
    this.save();
  },

  updateTask(index, title, desc) {
    this.tasks[index] = { ...this.tasks[index], title, desc };
    this.save();
  },

  toggleTask(index) {
    this.tasks[index].done = !this.tasks[index].done;
    this.save();
  },

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.save();
  },
};

// VIEW
const View = {
  elements: {
    todoList: document.getElementById("todoList"),
    newTaskBtn: document.getElementById("newTaskBtn"),
    taskModal: document.getElementById("taskModal"),
    deleteModal: document.getElementById("deleteModal"),
    taskTitle: document.getElementById("taskTitle"),
    taskDesc: document.getElementById("taskDesc"),
    saveTaskBtn: document.getElementById("saveTaskBtn"),
    cancelTaskBtn: document.getElementById("cancelTaskBtn"),
    confirmDeleteBtn: document.getElementById("confirmDeleteBtn"),
    cancelDeleteBtn: document.getElementById("cancelDeleteBtn"),
    menuBtn: document.getElementById("menuBtn"),
    sideMenu: document.getElementById("sideMenu"),
    lightModeBtn: document.getElementById("lightModeBtn"),
    darkModeBtn: document.getElementById("darkModeBtn"),
  },

  renderTasks(tasks) {
    this.elements.todoList.innerHTML = "";
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

      // hæft event på elementerne
      taskDiv.querySelector("input").addEventListener("change", () => {
        Controller.toggleTask(index);
      });

      taskDiv.querySelector(".task-text").addEventListener("click", () => {
        Controller.openEditTask(index);
      });

      taskDiv.querySelector(".deleteBtn").addEventListener("click", () => {
        Controller.openDeleteTask(index);
      });

      this.elements.todoList.appendChild(taskDiv);
    });
  },

  showTaskModal(title = "", desc = "") {
    this.elements.taskTitle.value = title;
    this.elements.taskDesc.value = desc;
    this.elements.taskModal.classList.remove("hidden");
  },

  hideTaskModal() {
    this.elements.taskModal.classList.add("hidden");
  },

  showDeleteModal() {
    this.elements.deleteModal.classList.remove("hidden");
  },

  hideDeleteModal() {
    this.elements.deleteModal.classList.add("hidden");
  },
};

// CONTROLLER
const Controller = {
  init() {
    // render tasks første gang
    View.renderTasks(Model.tasks);

    // knapper
    View.elements.newTaskBtn.addEventListener("click", () => {
      Model.editIndex = null;
      View.showTaskModal();
    });

    View.elements.saveTaskBtn.addEventListener("click", () => {
      const title = View.elements.taskTitle.value.trim();
      const desc = View.elements.taskDesc.value.trim();
      if (!title) return;

      if (Model.editIndex !== null) {
        Model.updateTask(Model.editIndex, title, desc);
      } else {
        Model.addTask(title, desc);
      }
      View.renderTasks(Model.tasks);
      View.hideTaskModal();
    });

    View.elements.cancelTaskBtn.addEventListener("click", () => {
      View.hideTaskModal();
    });

    View.elements.confirmDeleteBtn.addEventListener("click", () => {
      Model.deleteTask(Model.deleteIndex);
      View.renderTasks(Model.tasks);
      View.hideDeleteModal();
    });

    View.elements.cancelDeleteBtn.addEventListener("click", () => {
      View.hideDeleteModal();
    });

    // menu
    View.elements.menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      View.elements.sideMenu.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (
        !View.elements.sideMenu.contains(e.target) &&
        !View.elements.menuBtn.contains(e.target)
      ) {
        View.elements.sideMenu.classList.remove("show");
      }
    });

    // tema
    View.elements.lightModeBtn.addEventListener("click", () => {
      document.body.style.background = "#f5f5f5";
    });

    View.elements.darkModeBtn.addEventListener("click", () => {
      document.body.style.background = "#222";
      document.querySelectorAll(".task").forEach((t) => {
        t.style.background = "#555";
      });
    });
  },

  toggleTask(index) {
    Model.toggleTask(index);
    View.renderTasks(Model.tasks);
  },

  openEditTask(index) {
    Model.editIndex = index;
    const task = Model.tasks[index];
    View.showTaskModal(task.title, task.desc);
  },

  openDeleteTask(index) {
    Model.deleteIndex = index;
    View.showDeleteModal();
  },
};

Controller.init();
