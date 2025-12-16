document.addEventListener("DOMContentLoaded", () => {
  const upgradeButton = document.getElementById("upgrade-btn");
  upgradeButton.addEventListener("click", async () => {
    try {
      const cfgRes = await fetch("/api/config");
      if (!cfgRes.ok) throw new Error("Config fetch failed");

      const { publishableKey } = await cfgRes.json();

      const stripe = Stripe(publishableKey);

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const { id } = await res.json();

      await stripe.redirectToCheckout({ sessionId: id });
    } catch (err) {
      console.log("confirm payment", err);
      alert("Unable to start checkout. Ensure the server is running.");
    }
  });
});
