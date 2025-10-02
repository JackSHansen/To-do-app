import { elements } from "js/modules/view/elements.js";

export const renderTasks = (tasks, Controller) => {
  elements.todoList.innerHTML = "";

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

    taskDiv.querySelector("input").addEventListener("change", () => {
      Controller.toggleTask(index);
    });

    taskDiv.querySelector(".task-text").addEventListener("click", () => {
      Controller.openEditTask(index);
    });

    taskDiv.querySelector(".deleteBtn").addEventListener("click", () => {
      Controller.openDeleteTask(index);
    });

    elements.todoList.appendChild(taskDiv);
  });
};
