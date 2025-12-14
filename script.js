const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

document.addEventListener("DOMContentLoaded", () => {
  const dayTag = document.getElementById("current-day");
  const currentDay = new Date();

  dayIndex = currentDay.getDay();
  dayTag.textContent = days[dayIndex];
});
