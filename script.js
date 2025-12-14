import { days } from "./constants.js";

document.addEventListener("DOMContentLoaded", () => {
  const dayTag = document.getElementById("current-day");
  const currentDay = new Date();

  const dayIndex = currentDay.getDay();
  dayTag.textContent = days[dayIndex];
});
