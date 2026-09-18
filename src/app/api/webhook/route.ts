import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import type Stripe from "stripe";

// Stripe a besoin du corps BRUT pour verifier la signature.
export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature invalide", err);
    return NextResponse.json({ error: "signature invalide" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const s = event.data.object as Stripe.Checkout.Session;
    const userId = s.client_reference_id || s.metadata?.user_id;
    if (userId) {
      const admin = createAdminClient();
      await admin.from("entitlements").upsert({
        user_id: userId,
        has_full_access: true,
        stripe_customer_id: typeof s.customer === "string" ? s.customer : null,
        granted_at: new Date().toISOString(),
      });
      console.log("Acces accorde a", userId);
    }
  }
  return NextResponse.json({ received: true });
}
