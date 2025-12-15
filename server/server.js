import express from "express";
import Stripe from "stripe";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

process.loadEnvFile(".env");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const PRODUCT_ID = process.env.PRODUCT_ID;

app.get("/config", (req, res) => {
  console.log("hitting config");
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-checkout-session", async (req, res) => {
  console.log("hitting checkout session");

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/`,
    });

    res.json({ id: session.id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create session" });
  }
});

app.get("/checkout-session", async (req, res) => {
  console.log("hitting checkout session retrieval");
  const sessionId = req.query.session_id;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    res.json({ success: session.payment_status === "paid" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to retrieve session" });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
