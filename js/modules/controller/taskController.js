export const TaskController = {
  init(Model, View, Controller) {
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

      View.renderTasks(Model.tasks, Controller);
      View.hideTaskModal();
    });

    View.elements.cancelTaskBtn.addEventListener("click", () => {
      View.hideTaskModal();
    });

    View.elements.confirmDeleteBtn.addEventListener("click", () => {
      Model.deleteTask(Model.deleteIndex);
      View.renderTasks(Model.tasks, Controller);
      View.hideDeleteModal();
    });

    View.elements.cancelDeleteBtn.addEventListener("click", () => {
      View.hideDeleteModal();
    });
  },
};
