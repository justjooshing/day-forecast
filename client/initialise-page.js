import { days } from "./constants.js";

document.addEventListener("DOMContentLoaded", () => {
  const dayTag = document.getElementById("current-day");
  const currentDay = new Date();
  dayTag.textContent = days[currentDay.getDay()];

  const dialog = document.querySelector("dialog");
  const buttons = document.querySelectorAll(".locked-days");
  const closeButton = dialog.querySelector("button");

  buttons.forEach((button) =>
    button.addEventListener("click", () => dialog.showModal()),
  );
  closeButton.addEventListener("click", () => dialog.close());
});
