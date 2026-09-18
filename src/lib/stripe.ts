import Stripe from "stripe";

// apiVersion volontairement omis : le SDK utilise sa version par defaut,
// ce qui evite les erreurs de type quand Stripe met a jour ses versions.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
