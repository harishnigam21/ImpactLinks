import Stripe from "stripe";
import User from "../models/User.js";
import { envList } from "../envConfig.js";

const stripe = new Stripe(envList.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID, // Monthly subscription price ID
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${envList.FRONTEND_HOST}/dashboard?success=true`,
      cancel_url: `${envList.FRONTEND_HOST}/membership?canceled=true`,
      customer_email: user.email,
    });
    res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error("Error From createCheckoutSession controller : ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      envList.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("Error From handleWebhook controller : ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }

  // Handle subscription lifecycle events
  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
      // Mark user as active
      await User.findOneAndUpdate(
        { email: event.data.object.customer_email },
        { subscriptionStatus: "active" },
      );
      break;
    case "customer.subscription.deleted":
      // Mark user as inactive/lapsed (Requirement 4.4)
      await User.findOneAndUpdate(
        { email: event.data.object.customer_email },
        { subscriptionStatus: "inactive" },
      );
      break;
  }

  res.json({ received: true });
};
