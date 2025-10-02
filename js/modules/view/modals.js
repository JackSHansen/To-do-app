import { elements } from "js/modules/view/elements.js";

export const showTaskModal = (title = "", desc = "") => {
  elements.taskTitle.value = title;
  elements.taskDesc.value = desc;
  elements.taskModal.classList.remove("hidden");
};

export const hideTaskModal = () => {
  elements.taskModal.classList.add("hidden");
};

export const showDeleteModal = () => {
  elements.deleteModal.classList.remove("hidden");
};

export const hideDeleteModal = () => {
  elements.deleteModal.classList.add("hidden");
};
