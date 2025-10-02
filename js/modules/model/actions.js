import { state } from "js/modules/model/state.js";
import { Storage } from "js/modules/model/storage.js";

export const Actions = {
  addTask(title, desc) {
    state.tasks.push({ title, desc, done: false });
    Storage.save();
  },

  updateTask(index, title, desc) {
    state.tasks[index] = { ...state.tasks[index], title, desc };
    Storage.save();
  },

  toggleTask(index) {
    state.tasks[index].done = !state.tasks[index].done;
    Storage.save();
  },

  deleteTask(index) {
    state.tasks.splice(index, 1);
    Storage.save();
  },
};
