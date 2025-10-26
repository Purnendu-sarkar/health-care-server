import Stripe from "stripe";
import config from "../config";

if (!config.stripeSecretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
}

export const stripe = new Stripe(config.stripeSecretKey);