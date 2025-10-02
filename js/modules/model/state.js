export const state = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  editIndex: null,
  deleteIndex: null,
};
