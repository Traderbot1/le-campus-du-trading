import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "non connecte" }, { status: 401 });

  const site = process.env.NEXT_PUBLIC_SITE_URL!;
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    client_reference_id: user.id,          // pour retrouver l'eleve dans le webhook
    customer_email: user.email,
    metadata: { user_id: user.id },
    success_url: `${site}/dashboard?paid=1`,
    cancel_url: `${site}/dashboard?canceled=1`,
    allow_promotion_codes: true,
  });
  return NextResponse.json({ url: session.url });
}
