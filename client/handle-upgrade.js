import { apiUrl } from "./constants.js";

document.addEventListener("DOMContentLoaded", () => {
  const upgradeButton = document.getElementById("upgrade-btn");
  upgradeButton.addEventListener("click", async () => {
    try {
      const cfgRes = await fetch(`${apiUrl}/config`);
      if (!cfgRes.ok) throw new Error("Config fetch failed");

      const { publishableKey } = await cfgRes.json();

      const stripe = Stripe(publishableKey);

      const res = await fetch(`${apiUrl}/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const { id } = await res.json();

      await stripe.redirectToCheckout({ sessionId: id });
    } catch (err) {
      console.log("confirm payment", err);
      alert(
        "Unable to start checkout. Ensure the backend is running on port 4242 and .env is configured.",
      );
    }
  });
});
