export const UIController = {
  init(View) {
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
};
