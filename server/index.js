import Stripe from "stripe";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return corsResponse();
    }

    try {
      if (request.method === "GET" && url.pathname === "/api/config") {
        return jsonResponse({
          publishableKey: env.STRIPE_PUBLISHABLE_KEY,
        });
      }

      const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
        apiVersion: "2024-04-10",
      });

      if (
        request.method === "POST" &&
        url.pathname === "/api/create-checkout-session"
      ) {
        const session = await stripe.checkout.sessions.create({
          mode: "payment",
          payment_method_types: ["card"],
          line_items: [
            {
              price: env.PRICE_ID,
              quantity: 1,
            },
          ],
          success_url: `${env.CLIENT_URL}/?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${env.CLIENT_URL}/`,
        });

        return jsonResponse({ id: session.id });
      }

      if (
        request.method === "GET" &&
        url.pathname === "/api/checkout-session"
      ) {
        const sessionId = url.searchParams.get("session_id");

        if (!sessionId) {
          return jsonResponse({ error: "Missing session_id" }, 400);
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        return jsonResponse({
          success: session.payment_status === "paid",
        });
      }

      return new Response("Not Found", { status: 404 });
    } catch (err) {
      console.error(err);
      return jsonResponse({ error: "Server error" }, 500);
    }
  },
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(),
    },
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function corsResponse() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
}
