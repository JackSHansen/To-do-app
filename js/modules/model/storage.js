import { state } from "js/modules/model/state.js";

export const Storage = {
  save() {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  },
};
