import { Model } from "js/modules/model/model.js";
import { View } from "js/modules/view/view.js";
import { TaskController } from "js/modules/controller/taskController.js";
import { UIController } from "js/modules/controller/uiController.js";

export const Controller = {
  init() {
    View.renderTasks(Model.tasks, this);

    TaskController.init(Model, View, this);
    UIController.init(View);
  },

  toggleTask(index) {
    Model.toggleTask(index);
    View.renderTasks(Model.tasks, this);
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
