import { days } from "./constants.js";

const updateUIForSuccessfulPayment = () => {
  const upgradeButton = document.getElementById("upgrade-btn");
  upgradeButton.classList.add("hidden");

  const buttons = document.querySelectorAll(".locked-days");
  buttons.forEach((button, i) => {
    button.classList.remove("locked-days");
    button.classList.add("unlocked-days");
    button.textContent = days[(new Date().getDay() + i + 1) % 7];

    const p = document.createElement("p");
    p.id = button.id;
    p.className = button.className;
    p.textContent = button.textContent;

    button.parentNode.replaceChild(p, button);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get("session_id");

  if (sessionId) {
    sessionStorage.setItem("session_id", sessionId);
  }

  const storedSessionId = sessionStorage.getItem("session_id");

  if (!sessionId && storedSessionId) {
    return updateUIForSuccessfulPayment();
  }

  if (sessionId) {
    const res = await fetch(`/api/checkout-session?session_id=${sessionId}`);
    const data = await res.json();

    if (data.success) {
      updateUIForSuccessfulPayment();
    }
  }
});
